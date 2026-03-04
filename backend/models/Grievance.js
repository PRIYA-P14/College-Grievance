import mongoose from "mongoose";

const grievanceSchema = new mongoose.Schema(
  {
    grievanceId: { type: String, required: true, unique: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    attachment: { type: String, default: "" },
    department: { type: String, default: "" },
    remarks: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Escalated"],
      default: "Pending"
    },
    isAnonymous: { type: Boolean, default: true },
    slaDeadline: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    resolvedAt: { type: Date },
    rating: { type: Number, min: 1, max: 5 }
  },
  { timestamps: false }
);

export default mongoose.model("Grievance", grievanceSchema);
