require("dotenv").config();
const bcrypt = require("bcrypt");
const { connectDB, getCollection, closeDB } = require("../db/mongoDB.js");

async function createAdmin() {
  try {
    await connectDB();
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password || password.length < 12) {
      throw new Error("Provide ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters");
    }

    const admins = getCollection("admin");
    await admins.createIndex({ email: 1 }, { unique: true });
    const existingAdmin = await admins.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }
    const now = new Date();
    const result = await admins.insertOne({
      email,
      passwordHash: await bcrypt.hash(password, 12),
      role: "admin",
      createdAt: now,
      updatedAt: now
    });
    console.log("Admin created successfully");
    console.log("Admin ID:", result.insertedId.toString());
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exitCode = 1;
  } finally {
    await closeDB();
  }
}

createAdmin();
