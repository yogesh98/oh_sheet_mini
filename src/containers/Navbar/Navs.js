import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap"
import { useAuth } from "contexts/AuthContext";
import {  useNavigate  } from "react-router-dom";


export default function Navs() {
    const { logout } = useAuth();
    const navigate = useNavigate();


    const handleSelect= (eventKey) => {
        console.log(eventKey);
        if (eventKey === "logout") {
            logout();
        } else if(eventKey === "dashboard") {
            navigate("/owner/dashboard");
        }
    };


    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container >
                    <Navbar.Brand >📜</Navbar.Brand>
                    <Container className="d-flex align-items-center justify-content-space-between">
                        <Nav className="" onSelect={handleSelect}>
                            <Nav.Link eventKey="dashboard">Home</Nav.Link>
                        </Nav>
                        <Nav className="" onSelect={handleSelect}>
                            <Nav.Link eventKey="logout">Logout</Nav.Link>
                        </Nav>
                    </Container>
                </Container>
            </Navbar>
        </>
    )
}