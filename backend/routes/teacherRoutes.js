
const express = require("express");
const adminAuth = require("../middleware/adminAuth.js");

const {
  createTeacher,
  getAllTeachers,
  getTeacherLessons
} = require("../controllers/teacherController.js");

const router = express.Router();

// Create teacher
router.post("/", adminAuth, createTeacher);

// Get all teachers
router.get("/", getAllTeachers);

// Get lessons one teacher
router.get("/:id/lessons", getTeacherLessons);

module.exports = router;
