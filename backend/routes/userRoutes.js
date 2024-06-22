const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Get all users
router.get("/", authMiddleware, getUsers);

// Get a single user by ID
router.get("/:id", authMiddleware, getUserById);

// Update a user
router.put("/:id", authMiddleware, updateUser);

module.exports = router;
