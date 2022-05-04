import React, {useRef, useState} from "react";
import {Form, Button, Card, Alert} from "react-bootstrap";
import  { useAuth } from "../contexts/AuthContext";
import {Link, useNavigate} from "react-router-dom";

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login }  = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)

            navigate("/")
        } catch {
            setError("Failed to sign in")
        }

        setLoading(false)
    }

    return (
        <>
            <style type="text/css">
                {`  
                    .card-bckgrnd {
                        background-color: #a8dadcff;
                        border: 2px solid #457b9dff;
                    }
                    .btn-custom {
                        background-color: #457b9dff;
                        color: #f1faeeff;
                        border: 2px solid #f1faeeff;
                    }
                `}
            </style>
            <Card className="card-bckgrnd">
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef } required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-2 btn-custom" type="submit">Log In</Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>

    )
}