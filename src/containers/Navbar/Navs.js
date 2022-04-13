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
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container className="d-flex align-items-center justify-content-between" fluid>
                    <div className="d-flex align-items-center justify-content-start">
                        <Navbar.Brand >📜</Navbar.Brand>
                        <Nav onSelect={handleSelect}>
                            <Nav.Link eventKey="dashboard">Home</Nav.Link>
                        </Nav>
                    </div>
                    <Nav onSelect={handleSelect}>
                        <Nav.Link eventKey="logout">Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}