
const express = require("express");

const {
  searchLessons
} = require("../controllers/searchController.js");

const router = express.Router();

// GET search
router.get("/", searchLessons);

module.exports = router;
