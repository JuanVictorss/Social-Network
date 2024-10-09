import React, { useState, useEffect } from "react";
import { getLoginState, logout } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import Show from "./show";
import "../styles/navBar.css";

const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(getLoginState());
  console.log(loginState);

  useEffect(() => {
    setLoginState(getLoginState());
  }, [loginState]);

  const handleLogout = () => {
    setLoginState(!loginState);
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav>
        {/* {user ? ( */}
        <Show ifTrue={loginState}>
          <span>Welcome</span>
          <button onClick={handleLogout}>logout</button>
        </Show>
        {/* ) : ( */}
        <Show ifTrue={!loginState}>
          <div className="auth-container">
            <Link to="/Login" className="link">
              Login
            </Link>
            <Link to="/register" className="link">
              Sing Up
            </Link>
          </div>
        </Show>
        {/* )} */}
      </nav>
      {children}
    </>
  );
};

export default Navbar;
