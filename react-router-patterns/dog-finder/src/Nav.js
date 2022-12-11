import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import {v4 as uuid} from "uuid";

function Nav({dogNames}) {
    const linkNavLinks = dogNames.map((link) =>
        <NavLink key={uuid()}to={`/dogs/${link}`}>{link}</NavLink>
    );
  return (
    <nav className="NavBar">
        <NavLink to={`/dogs`}>Dogs: </NavLink>
      {linkNavLinks}
    </nav>
  );
}
// end

export default Nav;