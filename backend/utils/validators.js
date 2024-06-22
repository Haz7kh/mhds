// A utility file for validation functions

const { check, validationResult } = require("express-validator");

// Validate user registration
const validateUserRegistration = [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
];

// Validate user login
const validateUserLogin = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
];

// Validate course creation
const validateCourseCreation = [
  check("title", "Title is required").not().isEmpty(),
  check("description", "Description is required").not().isEmpty(),
];

// Handle validation results
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateCourseCreation,
  handleValidation,
};
