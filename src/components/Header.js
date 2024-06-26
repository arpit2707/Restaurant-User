// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";

const Header = () => {
  return (
    <header>
      <Link to="/dashboard">
        <h1>Restaurant App</h1>
      </Link>
      <nav>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
};

export default Header;
