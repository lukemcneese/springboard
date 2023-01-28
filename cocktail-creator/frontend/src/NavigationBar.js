import React, {useState, useContext} from "react";
import { NavLink, Navbar, Nav, NavItem,NavbarToggler, Collapse, NavbarBrand } from "reactstrap";
import UserContext from "./UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';


function NavigationBar({logout}) {
    const {currentUser} = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(true);

    function loggedInNav(){
        return (<>
            <NavItem>
                <NavLink href="/profile">Profile</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/"onClick={logout}>Logout {currentUser.firstName}</NavLink>
            </NavItem>
        </>);

    }
    function loggedOutNav(){
        return(<>
            <NavItem>
                <NavLink href="/login">Login</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/register">Register</NavLink>
            </NavItem>
        </>);
    }

    // <div style={{display: 'block', width: 550, padding: 30}}>
    // <Navbar color="light">
    return (
        <div>
            <Navbar>
                <NavbarBrand href="/">Cocktail Creator</NavbarBrand>
                <NavbarToggler onClick={() => { setIsOpen(!isOpen) }} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/cocktails">Cocktails</NavLink>
                        </NavItem>
                        {currentUser ? loggedInNav() : loggedOutNav()}
                    </Nav>
                </Collapse>
            </Navbar>
        </div >
    );
}

export default NavigationBar;
