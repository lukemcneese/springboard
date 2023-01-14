import React, {useContext} from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./UserContext";


function NavBar({logout}) {
  const {currUser} = useContext(UserContext)

  function protectedNav(){
    return (
      <>
        <NavItem>
          <NavLink to="/companies">companies</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/jobs">Jobs</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/profile">Profile</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/" onClick={logout}>
            Logout {currUser.username}
          </NavLink>
        </NavItem>
      </>
    )
  }
  function unProtectedNav(){
    return (
      <>
        <NavItem>
          <NavLink to="/login">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/register">Register</NavLink>
        </NavItem>
    </>
    )
  }


  return (
    <div>
      <Navbar expand="md">
        <NavLink to="/" className="navbar-brand">
          Jobly
        </NavLink>
        <Nav className="ml-auto" navbar>
          {currUser ? protectedNav(): unProtectedNav()}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
