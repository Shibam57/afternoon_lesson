const express = require("express");

const {
  getEnrolment
} = require("../controllers/enrolmentController.js");

const router = express.Router();

router.get("/:lessonid", getEnrolment);

module.exports = router;
