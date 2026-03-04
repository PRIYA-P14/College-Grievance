import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { isAllowedEmail } from "../utils/validateEmail.js";

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });

export const register = async (req, res, next) => {
  try {
    const { email, password, role, department, year } = req.body;
    if (!isAllowedEmail(email)) {
      return res.status(400).json({ message: "Email domain not allowed" });
    }
    if (role && !["student", "faculty"].includes(role)) {
      return res.status(400).json({ message: "Invalid role selection" });
    }
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hashed,
      role: role || "student",
      department,
      year
    });
    const token = signToken(user.id);
    res.status(201).json({
      token,
      user: { id: user.id, email: user.email, role: user.role, accountStatus: user.accountStatus }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (user.accountStatus === "Suspended") {
      return res.status(403).json({ message: "Account suspended" });
    }
    const token = signToken(user.id);
    res.json({
      token,
      user: { id: user.id, email: user.email, role: user.role, accountStatus: user.accountStatus }
    });
  } catch (error) {
    next(error);
  }
};
