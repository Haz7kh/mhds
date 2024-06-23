const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("courses");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log(`Attempting to delete user with ID: ${req.params.id}`);
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      console.log(`User with ID: ${req.params.id} has been removed.`);
      res.json({ message: "User removed" });
    } else {
      console.log(`User not found with ID: ${req.params.id}`);
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(`Error deleting user with ID: ${req.params.id}`, error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      user.isAdmin = req.body.isAdmin ?? user.isAdmin;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const enrollUserInCourse = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const courseId = req.body.courseId;
      if (!user.courses.includes(courseId)) {
        user.courses.push(courseId);
        await user.save();
        res.json({ message: "User enrolled in course successfully" });
      } else {
        res
          .status(400)
          .json({ message: "User is already enrolled in this course" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new User({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    isAdmin: isAdmin || false,
  });

  const createdUser = await user.save();

  if (createdUser) {
    res.status(201).json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  enrollUserInCourse,
  createUser,
};
