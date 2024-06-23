import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.filter((user) => user._id !== id));
        alert("User deleted successfully");
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Failed to delete user");
      }
    }
  };

  const handleEditUser = (id) => {
    navigate(`/admin/edit-user/${id}`);
  };

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.email})
            <button onClick={() => handleEditUser(user._id)}>Edit</button>
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
