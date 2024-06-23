import React, { useState } from "react";
import axios from "axios";

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
        "http://localhost:3000/api/auth",
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
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          Admin
        </label>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
