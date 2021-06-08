import React, {Component} from 'react';
import { Navbar, Nav, NavDropdown, } from "react-bootstrap";

class Header extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" fixed="top" >
                <Navbar.Brand href="/">ICAF</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/keynotes">Keynotes</Nav.Link>
                        <Nav.Link href="/about">AboutUs</Nav.Link>
                        <NavDropdown title="For Researchers" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/action">Action</NavDropdown.Item>
                            <NavDropdown.Item href="/action">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="/action">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/action">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="For Workshop" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/action">Action</NavDropdown.Item>
                            <NavDropdown.Item href="/action">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="/action">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/action">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Profile" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                            <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;