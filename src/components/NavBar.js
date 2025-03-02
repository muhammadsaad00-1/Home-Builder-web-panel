import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Import CSS for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Your Logo</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
