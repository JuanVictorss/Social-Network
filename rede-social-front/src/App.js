import React from "react";
import "./App.css";
import home from "./assets/home.svg";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="home-container">
      <img
        src={home}
        alt="
          Silhueta
          dessoas
          usando
          computadores
          e
          celulares
          com
          simbolos
          próximos
          a
          elas
          que
          representam
          curtidas
          e
          comentários"
        className="imagem"
      />
      <div className="home-right">
        <h1>Welcome to the Universo OnLine</h1>
        <p>Conect...</p>
        <div className="links">
          <Link to="/Login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default App;
