const Course = require("../models/Course");
const User = require("../models/User");

// Fetch all courses (admin only)
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Fetch enrolled courses (non-admin users)
const getEnrolledCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("courses");
    if (user) {
      res.json(user.courses);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getAllCourses,
  getEnrolledCourses,
};
