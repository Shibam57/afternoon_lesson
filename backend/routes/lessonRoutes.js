const express = require("express");
const adminAuth = require("../middleware/adminAuth.js");
const upload = require("../middleware/uploadMiddleware.js");

const {
  createLesson,
  getAllLessons,
  updateLesson
} = require("../controllers/lessonController.js");

const router = express.Router();

// view lessons
router.get("/", getAllLessons);

// Create lessons
router.post("/post", adminAuth, upload.single("image"), createLesson);

// Update lesson details
router.put("/:id", updateLesson);

module.exports = router;