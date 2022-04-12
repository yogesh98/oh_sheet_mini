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
                <Container className="d-flex align-items-center justify-content-space-between" fluid>
                    <Navbar.Brand >📜</Navbar.Brand>
                    <Nav className="me-auto" onSelect={handleSelect}>
                        <Nav.Link eventKey="dashboard">Home</Nav.Link>
                    </Nav>
                    <Nav className="" onSelect={handleSelect}>
                        <Nav.Link eventKey="logout">Logout</Nav.Link>
                    </Nav>
                    {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse> */}
                </Container>
            </Navbar>
        </>
    )
}