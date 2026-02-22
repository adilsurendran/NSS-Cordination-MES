import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import LOGIN from "./Modals/Login.js";


mongoose.connect("mongodb://127.0.0.1:27017/NSS");

const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10); // 🔒 hash password
    await LOGIN.create({
      username: "admin",
      password: hashedPassword,
      role: "admin",
    });
    console.log("✅ Admin created successfully!");
  } catch (err) {
    console.error("❌ Error creating admin:", err);
  } finally {
    process.exit();
  }
};

createAdmin();
