import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap"
import { useAuth } from "contexts/AuthContext";


export default function Navs() {
    const { logout } = useAuth();

    const handleSelect= (eventKey) => {
        console.log(eventKey);
        if (eventKey === "logout") {
            logout().then(() => {
                console.log("hello");
                // window.location.reload();
            });
        }
    };


    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">📜</Navbar.Brand>
                    <Nav className="me-auto" onSelect={handleSelect}>
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <Nav.Link eventKey="logout">Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}