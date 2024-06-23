const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Set up storage engine
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Initialize upload
const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // Increase file size limit to 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
});

// Upload endpoint
router.post("/", upload.single("image"), (req, res) => {
  if (req.file === undefined) {
    res.status(400).json({ message: "No file selected" });
  } else {
    res.json({
      message: "File uploaded successfully",
      filePath: `/uploads/${req.file.filename}`,
    });
  }
});

module.exports = router;
