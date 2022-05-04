import React, { useState } from "react";
import {Container, Nav, Navbar, Button, Alert} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";



export default function Menu() {
    const { logout } = useAuth()
    const [error, setError] = useState("")
    const navigate = useNavigate()

    function handleDashboard() {
        navigate("/dashboard")
    }

    async function handleLogout() {
        setError("")
        try {
            await logout()
            navigate("/login")
        } catch {
            setError("Failed to log out")
        }
    }
    return (
        <Navbar bg="light" className="menu-custom" expand="md">
            <Container>
                <Navbar.Brand><img alt="logo" src={require('../logo/logo_small.jpg')} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Button className="btn-custom mb-2" onClick={handleDashboard}>Your Profile</Button>
                        <Button className="btn-custom mb-2" onClick={handleLogout}>Log Out</Button>
                        {error && <Alert variant="danger">{error}</Alert>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}