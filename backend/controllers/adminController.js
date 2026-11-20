const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getCollection } = require("../db/mongoDB.js");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (
      typeof email !== "string" || !email.trim() ||
      typeof password !== "string" || !password
    ) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const admin = await getCollection("admin").findOne({ email: email.trim().toLowerCase() });
    if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is missing");
    const token = jwt.sign(
      { sub: admin._id.toString(), role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h", algorithm: "HS256" }
    );
    return res.status(200).json({ success: true, message: "Admin login successful", token });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

module.exports = { loginAdmin };
