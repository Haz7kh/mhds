import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="courses-container">
      <h2 className="courses-header">Courses</h2>
      <ul className="courses-list">
        {courses.map((course) => (
          <li key={course._id} className="courses-list-item">
            <Link to={`/questions/${course._id}`} className="courses-link">
              {course.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Courses;
