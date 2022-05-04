import React from "react";
import { Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";


export default function Menu() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand><img src={require('../logo/logo_small.jpg')} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#myCollectionStart">My Collection</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}