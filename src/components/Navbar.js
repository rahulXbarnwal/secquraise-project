import "./Navbar.css";

import React from "react";

const Navbar = ({ male, female }) => {
  return (
    <nav className="navbar bg-info">
      <div className="container-fluid">
        <a className="navbar-brand">SECQURAISE</a>
        <div className="mainDiv">
          <div className="container text-bg-success mf">{male}</div>
          <div className="container text-bg-danger mf">{female}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
