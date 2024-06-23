const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");

dotenv.config(); // Load env vars

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const questionRoutes = require("./routes/questionRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

connectDB();

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your frontend application to access the backend
  })
);

app.use(express.json());

// Static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/upload", uploadRoutes); // Use upload routes

const PORT = process.env.PORT || 5002;

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
