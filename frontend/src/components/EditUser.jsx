import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setName(response.data.name);
        setEmail(response.data.email);
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/users/${userId}`,
        { name, email, password, isAdmin },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("User updated successfully");
      navigate("/users");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleEditUser}>
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
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
