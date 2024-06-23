const Question = require("../models/Question");
const Course = require("../models/Course");

const addQuestion = async (req, res) => {
  const { courseId, questionText, answers, correctAnswer, imageUrl } = req.body;
  const course = await Course.findById(courseId);
  if (course) {
    const question = new Question({
      course: courseId,
      questionText,
      answers,
      correctAnswer,
      imageUrl,
    });
    const createdQuestion = await question.save();
    res.status(201).json(createdQuestion);
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};

const getQuestions = async (req, res) => {
  const questions = await Question.find({ course: req.params.courseId });
  res.json(questions);
};

const deleteQuestion = async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (question) {
    await question.remove();
    res.json({ message: "Question removed" });
  } else {
    res.status(404).json({ message: "Question not found" });
  }
};

const updateQuestion = async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (question) {
    question.questionText = req.body.questionText || question.questionText;
    question.answers = req.body.answers || question.answers;
    question.correctAnswer = req.body.correctAnswer || question.correctAnswer;
    question.imageUrl = req.body.imageUrl || question.imageUrl;
    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } else {
    res.status(404).json({ message: "Question not found" });
  }
};

module.exports = { addQuestion, getQuestions, deleteQuestion, updateQuestion };
