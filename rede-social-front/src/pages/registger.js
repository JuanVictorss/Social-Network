import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import "../styles/login.css";
import back from "../assets/back-button.svg";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await register(name, email, password);
      setSuccess(data.message);
      setError(null);
      navigate("/login");
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div>
      <Link to="/" className="back-link">
        <img src={back} alt="back" />
      </Link>
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
    </div>
  );
};

export default Register;
