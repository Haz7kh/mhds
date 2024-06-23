const express = require("express");
const { authUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;
