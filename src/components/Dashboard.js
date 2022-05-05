import React, {useState} from "react";
import {Alert, Button, Card} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
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
            <Card className="card-bckgrnd">
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email: </strong> {currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3 btn-custom">Update Profile</Link>
                    <Link to="/" className="btn btn-primary w-100 mt-3 btn-custom">Back to My Collection</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    )
}