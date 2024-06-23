const express = require("express");
const {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  enrollUserInCourse,
  createUser,
} = require("../controllers/userController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, admin, getUsers)
  .post(protect, admin, createUser);
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);
router.route("/:id/enroll").post(protect, admin, enrollUserInCourse);

module.exports = router;
