import React, { useState } from "react";
import axios from "axios";
import "../styles/AddCourse.css";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/courses",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Course added successfully");
    } catch (error) {
      console.error("Failed to add course:", error);
    }
  };

  return (
    <div className="add-course-container">
      <h2 className="add-course-header">Add Course</h2>
      <form className="add-course-form" onSubmit={handleAddCourse}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          className="add-course-input-field"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          className="add-course-textarea"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="add-course-button">
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
