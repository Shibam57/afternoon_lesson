const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/images", (req, res) => res.status(404).json({ message: "Image not found" }));
app.use(cookieParser());

const lessonRoutes = require("./routes/lessonRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const teacherRoutes = require("./routes/teacherRoutes.js");
const searchRoutes = require("./routes/searchRoutes.js");
const enrolmentRoutes = require("./routes/enrolmentRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");

app.use("/lessons", lessonRoutes);
app.use("/orders", orderRoutes);
app.use("/teachers", teacherRoutes);
app.use("/search", searchRoutes);
app.use("/enrolment", enrolmentRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => res.json({ message: "After School API is running" }));

module.exports = app;
