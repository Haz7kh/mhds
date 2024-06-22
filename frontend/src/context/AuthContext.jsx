// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("authRole");
    return token && role ? { token, role } : null;
  });

  useEffect(() => {
    if (auth) {
      localStorage.setItem("authToken", auth.token);
      localStorage.setItem("authRole", auth.role);
    } else {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authRole");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
