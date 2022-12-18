import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";


function NavBar() {
  return (
    <div>
      <Navbar expand="md">
        <NavLink to="/" className="navbar-brand">
          Jobly
        </NavLink>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink to="/companies">companies</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/jobs">Jobs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/register">Register</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/profile">Profile</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
