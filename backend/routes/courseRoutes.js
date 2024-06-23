const express = require("express");
const {
  getAllCourses,
  getEnrolledCourses,
} = require("../controllers/courseController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, admin, getAllCourses); // Admin route to fetch all courses
router.route("/enrolled").get(protect, getEnrolledCourses); // User route to fetch enrolled courses

module.exports = router;
