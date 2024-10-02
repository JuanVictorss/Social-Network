import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import back from "../assets/back-button.svg";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/feed");
    } catch (err) {
      setError("Login failed");
    }
  };
  return (
    <div>
      <Link to="/" className="back-link">
        <img src={back} alt="back" />
      </Link>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="input-container">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          ></input>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          ></input>
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
