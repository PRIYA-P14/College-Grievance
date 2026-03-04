import Grievance from "../models/Grievance.js";
import User from "../models/User.js";

export const listAllGrievances = async (req, res, next) => {
  try {
    await Grievance.updateMany(
      { status: { $ne: "Resolved" }, slaDeadline: { $lt: new Date() } },
      { $set: { status: "Escalated" } }
    );
    const filters = {};
    if (req.query.category) filters.category = req.query.category;
    if (req.query.status) filters.status = req.query.status;
    const grievances = await Grievance.find(filters)
      .populate("studentId", "role")
      .sort({ createdAt: -1 });
    res.json(grievances);
  } catch (error) {
    next(error);
  }
};

export const updateGrievance = async (req, res, next) => {
  try {
    const { status, department, remarks } = req.body;
    const grievance = await Grievance.findById(req.params.id);
    if (!grievance) {
      return res.status(404).json({ message: "Grievance not found" });
    }
    if (status) grievance.status = status;
    if (department) grievance.department = department;
    if (remarks) grievance.remarks = remarks;
    if (status === "Resolved") {
      grievance.resolvedAt = new Date();
    }
    await grievance.save();
    res.json(grievance);
  } catch (error) {
    next(error);
  }
};

export const suspendStudent = async (req, res, next) => {
  try {
    const student = await User.findByIdAndUpdate(
      req.params.id,
      { accountStatus: "Suspended" },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ id: student.id, accountStatus: student.accountStatus });
  } catch (error) {
    next(error);
  }
};
