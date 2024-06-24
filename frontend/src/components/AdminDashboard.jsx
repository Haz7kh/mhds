import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserPlus,
  FaBook,
  FaUsers,
  FaListAlt,
  FaQuestionCircle,
  FaUserCheck,
} from "react-icons/fa";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="container">
      <h2 className="header">Admin Dashboard</h2>
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/admin/add-user" className="nav-link">
            <FaUserPlus className="nav-icon" />
            Add User
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/add-course" className="nav-link">
            <FaBook className="nav-icon" />
            Add Course
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/users" className="nav-link">
            <FaUsers className="nav-icon" />
            View Users
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/courses" className="nav-link">
            <FaListAlt className="nav-icon" />
            View Courses
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/add-question" className="nav-link">
            <FaQuestionCircle className="nav-icon" />
            Add Question
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/enroll-user" className="nav-link">
            <FaUserCheck className="nav-icon" />
            Enroll User in Course
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
