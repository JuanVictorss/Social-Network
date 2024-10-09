import axios from "axios";

const API_URL = "http://localhost:5000/api/";

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
      localStorage.setItem("login", true);
    }
    return response.data;
  } catch (err) {
    console.err(err);
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.setItem("login", false);
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const getLoginState = () => {
  return JSON.parse(localStorage.getItem("login"));
};
