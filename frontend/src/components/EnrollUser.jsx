import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/EnrollUser.css";

const EnrollUser = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    const fetchUsersAndCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const usersResponse = await axios.get(
          "http://localhost:3000/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const coursesResponse = await axios.get(
          "http://localhost:3000/api/courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(usersResponse.data);
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error("Failed to fetch users and courses:", error);
      }
    };

    fetchUsersAndCourses();
  }, []);

  const handleEnrollUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3000/api/users/${selectedUser}/enroll`,
        { courseId: selectedCourse },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("User enrolled in course successfully");
      setSelectedUser("");
      setSelectedCourse("");
    } catch (error) {
      console.error("Failed to enroll user:", error);
    }
  };

  return (
    <div className="enroll-user-container">
      <h2 className="enroll-user-header">Enroll User in Course</h2>
      <form className="enroll-user-form" onSubmit={handleEnrollUser}>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          required
          className="enroll-user-select"
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} - {user.email}
            </option>
          ))}
        </select>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          required
          className="enroll-user-select"
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
        <button type="submit" className="enroll-user-button">
          Enroll User
        </button>
      </form>
    </div>
  );
};

export default EnrollUser;
