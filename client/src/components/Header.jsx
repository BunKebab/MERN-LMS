import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="navbar bg-base-100 fixed top-0">
      <div className="navbar-start"></div>
      <Link to="/" className="btn btn-ghost text-xl navbar-center">
        Library Management System
      </Link>
      <div className="navbar-end"></div>
    </div>
  );
};

export default Header;
