import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <Link to="/admin/add-user">Add User</Link>
        </li>
        <li>
          <Link to="/admin/add-course">Add Course</Link>
        </li>
        <li>
          <Link to="/users">View Users</Link>
        </li>
        <li>
          <Link to="/courses">View Courses</Link>
        </li>
        <li>
          <Link to="/admin/add-question">Add Question</Link>
        </li>
        <li>
          <Link to="/admin/enroll-user">Enroll User in Course</Link>
        </li>{" "}
        {/* Link to Enroll User */}
      </ul>
    </div>
  );
};

export default AdminDashboard;
