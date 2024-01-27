import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-title">Jeopardy Study!</div>
      <ul className="navbar-links"> 
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          
          <Link to="/topics-list" className="nav-link">
            Study
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
