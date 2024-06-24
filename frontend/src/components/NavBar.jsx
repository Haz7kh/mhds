import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css"; // Import CSS for styling

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="Logo" /> {/* Replace with your logo */}
      </div>
      <ul className="navbar-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/courses">Courses</Link>
        </li>
        {isAdmin && (
          <li>
            <Link to="/admin">Dashboard</Link>
          </li>
        )}
      </ul>
      <div className="navbar-right">
        {token ? (
          <>
            <span>{userName}</span>
            <span className="profile-icon">
              <Link to="/profile">{isAdmin ? "🛡️ Admin" : "🎓 Student"}</Link>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
