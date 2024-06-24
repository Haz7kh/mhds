import React, { useState } from "react";
import axios from "axios";
import "../styles/AddUser.css";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/users", // Updated endpoint
        { name, email, password, isAdmin },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("User added successfully");
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  return (
    <div className="add-user-container">
      <h2 className="add-user-header">Add User</h2>
      <form className="add-user-form" onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          className="add-user-input-field"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="add-user-input-field"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="add-user-input-field"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="add-user-checkbox-label">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          Admin
        </label>
        <button type="submit" className="add-user-button">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
