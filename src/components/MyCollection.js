import React, {useState} from "react";
import {Alert, Button, Card} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function MyCollection() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

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
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">My Collection</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Collection of: </strong> {currentUser.email}
                    <Link to="/add-to-my-collection" className="btn btn-primary w-100 mt-3">Add To My Collection</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    )
}