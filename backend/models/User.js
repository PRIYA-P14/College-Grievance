import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "faculty", "admin", "officer"],
      default: "student"
    },
    department: { type: String, default: "" },
    year: { type: String, default: "" },
    accountStatus: {
      type: String,
      enum: ["Approved", "Suspended"],
      default: "Approved"
    }
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

export default mongoose.model("User", userSchema);
