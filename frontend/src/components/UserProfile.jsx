import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/UserProfile.css";

const UserProfile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="user-profile-container">
      <h2 className="user-profile-header">User Profile</h2>
      <p className="user-profile-info">Name: {profile.name}</p>
      <p className="user-profile-info">Email: {profile.email}</p>
      <p className="user-profile-courses-header">Courses:</p>
      <ul className="user-profile-courses-list">
        {profile.courses &&
          profile.courses.map((course) => (
            <li key={course._id} className="user-profile-courses-list-item">
              <Link
                to={`/questions/${course._id}`}
                className="user-profile-course-link"
              >
                {course.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default UserProfile;
