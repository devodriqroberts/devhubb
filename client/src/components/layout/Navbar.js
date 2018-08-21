import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
  <div className="container">
    <NavLink className="navbar-brand" to="/">Dev-Hubb</NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="mobile-nav">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/profiles"> Developers
          </NavLink>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">Sign Up</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
    )
  };
};

export default Navbar;
