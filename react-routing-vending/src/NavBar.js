import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="NavBar">
      <NavLink exact to="/">
        Vending Machine
      </NavLink>
      <NavLink exact to="/candy">
        Candy
      </NavLink>
      <NavLink exact to="/soda">
        Soda
      </NavLink>
      <NavLink exact to="/chips">
        Chips
      </NavLink>
    </nav>
  );
}

export default NavBar;
