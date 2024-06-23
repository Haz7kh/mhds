import React, { useState } from "react";
import axios from "axios";

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
    <div>
      <h2>Add Course</h2>
      <form onSubmit={handleAddCourse}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
