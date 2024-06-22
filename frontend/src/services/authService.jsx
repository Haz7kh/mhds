// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export default {
  login,
};
