import React from "react";
import { getCurrentUser, logout } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const handleLogin = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      {user ? (
        <>
          <span>Welcome, {user.name}</span>
          <button onClick={handleLogin}>logout</button>
        </>
      ) : (
        <Link to="/"></Link>
      )}
    </nav>
  );
};

export default Navbar;
