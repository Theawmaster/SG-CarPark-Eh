import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/all-carparks">All Carparks</Link></li>
        <li><Link to="/nearby-carparks">Nearby Carparks</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
