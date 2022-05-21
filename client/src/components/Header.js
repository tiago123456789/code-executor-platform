import React from "react";
import { Nav, Button, NavbarText, Navbar, NavbarBrand, Collapse, NavbarToggler, NavItem } from "reactstrap"
import { Link, NavLink } from "react-router-dom";

export default () => {

    const logout = () => {
        localStorage.removeItem("accessToken");
        window.location.href = "/login"
    }

    return (
        <Navbar
            color="light"
            expand="md"
            light
        >
            <NavbarBrand>
                <Link to="/gists">
                    MySnippets
                </Link>
            </NavbarBrand>
            <NavbarToggler onClick={function noRefCheck() { }} />
            <Collapse navbar>
                <Nav
                    className="me-auto"
                    navbar
                >
                </Nav>
                <NavbarText>
                    <Button onClick={() => logout()}>
                        Logout
                    </Button>
                </NavbarText>
            </Collapse>
        </Navbar>
    )
}