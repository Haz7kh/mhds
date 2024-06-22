// src/App.jsx
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import "./styles/global.css";

const App = () => (
  <AuthProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  </AuthProvider>
);

const Home = () => <div>Welcome to Traffic School</div>;

const ProtectedRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  if (!auth) {
    return <Navigate to="/login" />;
  }
  if (auth.role === "admin" && window.location.pathname !== "/admin") {
    return <Navigate to="/admin" />;
  }
  if (auth.role !== "admin" && window.location.pathname === "/admin") {
    return <Navigate to="/profile" />;
  }
  return children;
};

export default App;
