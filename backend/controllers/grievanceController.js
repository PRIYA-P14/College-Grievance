import Grievance from "../models/Grievance.js";
import { generateGrievanceId } from "../utils/generateId.js";
import { hasProfanity } from "../utils/profanity.js";

const SLA_HOURS = 72;

const getWordCount = (text) => (text || "").trim().split(/\s+/).filter(Boolean).length;

const enforceAutoEscalation = async () => {
  await Grievance.updateMany(
    { status: { $ne: "Resolved" }, slaDeadline: { $lt: new Date() } },
    { $set: { status: "Escalated" } }
  );
};

export const createGrievance = async (req, res, next) => {
  try {
    const { category, description, attachment } = req.body;
    if (getWordCount(description) < 10) {
      return res.status(400).json({ message: "Description must be at least 10 words" });
    }
    if (hasProfanity(description)) {
      return res.status(400).json({ message: "Description contains disallowed language" });
    }
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const count = await Grievance.countDocuments({
      studentId: req.user.id,
      createdAt: { $gte: since }
    });
    if (count >= 2) {
      return res.status(429).json({ message: "Daily grievance limit reached" });
    }
    const sinceCategory = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const categoryExists = await Grievance.findOne({
      studentId: req.user.id,
      category,
      createdAt: { $gte: sinceCategory }
    });
    if (categoryExists) {
      return res.status(429).json({ message: "Similar grievance recently submitted" });
    }
    const slaDeadline = new Date(Date.now() + SLA_HOURS * 60 * 60 * 1000);
    const grievance = await Grievance.create({
      grievanceId: generateGrievanceId(),
      studentId: req.user.id,
      category,
      description,
      attachment,
      slaDeadline,
      isAnonymous: true
    });
    res.status(201).json(grievance);
  } catch (error) {
    next(error);
  }
};

export const listMyGrievances = async (req, res, next) => {
  try {
    await enforceAutoEscalation();
    const grievances = await Grievance.find({ studentId: req.user.id }).sort({ createdAt: -1 });
    res.json(grievances);
  } catch (error) {
    next(error);
  }
};

export const rateGrievance = async (req, res, next) => {
  try {
    const { rating } = req.body;
    const grievance = await Grievance.findOne({
      _id: req.params.id,
      studentId: req.user.id
    });
    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }
    if (grievance.status !== "Resolved") {
      return res.status(400).json({ message: "Only resolved grievances can be rated" });
    }
    grievance.rating = rating;
    await grievance.save();
    res.json(grievance);
  } catch (error) {
    next(error);
  }
};
