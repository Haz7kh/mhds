const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourses,
  addQuestion,
} = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");
const {
  validateCourseCreation,
  handleValidation,
} = require("../utils/validators");

// Create a new course
router.post(
  "/",
  authMiddleware,
  validateCourseCreation,
  handleValidation,
  createCourse
);

// Get all courses
router.get("/", getCourses);

// Add a question to a course
router.post("/question", authMiddleware, addQuestion);

module.exports = router;
