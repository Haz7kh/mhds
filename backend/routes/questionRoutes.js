const express = require("express");
const {
  addQuestion,
  getQuestions,
  deleteQuestion,
  updateQuestion,
} = require("../controllers/questionController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(protect, admin, addQuestion);
router.route("/:courseId").get(protect, getQuestions);
router
  .route("/:id")
  .delete(protect, admin, deleteQuestion)
  .put(protect, admin, updateQuestion);

module.exports = router;
