const Course = require("../models/Course");
const Question = require("../models/Question");

// Create a new course
exports.createCourse = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
    });

    const course = await newCourse.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("questions");
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Add a question to a course
exports.addQuestion = async (req, res) => {
  const { questionText, options, correctOption, courseId } = req.body;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    const newQuestion = new Question({
      questionText,
      options,
      correctOption,
      course: courseId,
    });

    const question = await newQuestion.save();

    course.questions.push(question.id);
    await course.save();

    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
