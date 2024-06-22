const express = require("express");
const router = express.Router();
const { getQuestions } = require("../controllers/questionController");
const authMiddleware = require("../middleware/authMiddleware");

// Get all questions for a course
router.get("/:courseId", authMiddleware, getQuestions);

module.exports = router;
