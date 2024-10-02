import axios from "axios";

const API_URL = "http://192.168.0.4:5000/api/";

export const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}auth/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Registration failed");
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}auth/login`, {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (err) {
    console.err(err);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
