import React, {Component} from 'react';
import { Navbar, Button, Nav, NavDropdown, Form, FormControl } from "react-bootstrap";

class Header extends Component {
    render() {
        return (
            <header>
                <Navbar bg="dark" variant="dark" expand="lg" fixed="top" >
                    <Navbar.Brand href="#home">ICAF</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/keynotes">Keynotes</Nav.Link>
                            <NavDropdown title="For Researchers" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown><NavDropdown title="For Workshop" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown><NavDropdown title="For Attendee" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        {/*<Form inline>*/}
                        {/*    <FormControl type="text" placeholder="Search" className="mr-sm-2" />*/}
                        {/*    <Button variant="outline-success">Search</Button>*/}
                        {/*</Form>*/}
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}

export default Header;