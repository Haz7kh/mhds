const express = require("express");
const {
  getAllCourses,
  getEnrolledCourses,
  createCourse,
} = require("../controllers/courseController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, admin, getAllCourses); // Admin route to fetch all courses
router.route("/enrolled").get(protect, getEnrolledCourses); // User route to fetch enrolled courses
router.route("/").post(protect, admin, createCourse); // Admin route to create a new course

module.exports = router;
