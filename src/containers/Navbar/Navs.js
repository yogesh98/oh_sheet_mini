import React from "react";
import { Container, Navbar, Nav, NavDropdown, Offcanvas } from "react-bootstrap"
import { useAuth } from "contexts/AuthContext";
import {  useNavigate  } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi';


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
            <Navbar bg="dark" variant="dark" expand={false}>
                <Container fluid>
                    <Navbar.Brand >📜</Navbar.Brand>
                    <Nav className="justify-content-end" onSelect={handleSelect}>
                        <Nav.Link eventKey="dashboard">Home</Nav.Link>
                    </Nav>
                    <Nav className="" onSelect={handleSelect}>
                        <Nav.Link eventKey="logout">Logout</Nav.Link>
                    </Nav>
                    {/* <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="#action1">Home</Nav.Link>
                                <Nav.Link href="#action2">Link</Nav.Link>
                                <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                                    <NavDropdown.Item href="#action3">Logged In</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas> */}
                </Container>
            </Navbar>
            {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                <Navbar.Brand >📜</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link eventKey="dashboard">Home</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown title={<GiHamburgerMenu />} id="collasible-nav-dropdown">
                                <NavDropdown.Item>Logged In</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <Nav.Link eventKey="logout">Logout</Nav.Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> */}
            {/* <Navbar bg="dark" variant="dark">
                <Container fluid >
                    <Navbar.Brand >📜</Navbar.Brand>
                    <Nav className="justify-content-end" onSelect={handleSelect}>
                        <Nav.Link eventKey="dashboard">Home</Nav.Link>
                    </Nav>
                    <Nav className="" onSelect={handleSelect}>
                        <Nav.Link eventKey="logout">Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar> */}
        </>
    )
}