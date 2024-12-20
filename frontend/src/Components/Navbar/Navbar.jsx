import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/home">Accueil</Link>
        </li>
        <li>
          <Link to="/post">Créer un Post</Link>
        </li>
        <li>
          <Link to="/users">Gestion des Utilisateurs</Link>
        </li>
        <li>
          <Link to="/register">Inscription</Link>
        </li>
        <li>
          <Link to="/">Déconnexion</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
