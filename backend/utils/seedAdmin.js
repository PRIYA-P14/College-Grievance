import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User.js";

dotenv.config();

const seedAdmin = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not configured");
  }
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set");
  }

  await mongoose.connect(uri, { autoIndex: true });

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin already exists");
    await mongoose.disconnect();
    return;
  }

  const hashed = await bcrypt.hash(password, 12);
  await User.create({
    email,
    password: hashed,
    role: "admin",
    accountStatus: "Approved"
  });

  console.log("Admin seeded");
  await mongoose.disconnect();
};

seedAdmin().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
