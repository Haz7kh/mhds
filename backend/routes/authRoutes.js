// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

console.log(register); // Should log the function definition, not undefined
console.log(login); // Should log the function definition, not undefined

const {
  validateUserRegistration,
  validateUserLogin,
  handleValidation,
} = require("../utils/validators");

// Register User
router.post("/register", validateUserRegistration, handleValidation, register);

// Authenticate User & get token
router.post("/login", validateUserLogin, handleValidation, login);

module.exports = router;
