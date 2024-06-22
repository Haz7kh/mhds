const Question = require("../models/Question");

// Get all questions for a course
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ course: req.params.courseId });
    res.json(questions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
