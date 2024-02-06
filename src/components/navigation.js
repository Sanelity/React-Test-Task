import React from 'react';
import { Nav, Navbar, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../logo.svg'

const Styles = styled.div `
    a, .navbar-brand, .navbar-nav .nav-link {
        color: #adb1b8;
        &:hover{
            color: white
        }
    }
`

export default function Navigation() {

    return (
        <>
            <Styles>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand>
                            <img src={logo} width="30" height="30" alt="logo" />
                        </Navbar.Brand>
                        <Navbar.Brand>Sanelite Web</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link><Link to="/">Home</Link></Nav.Link>
                                    <Nav.Link><Link to="/statistics">Covid-19 Statistics</Link></Nav.Link>
                                </Nav>
                        </Navbar.Collapse>

                    </Container>
                </Navbar>
            </Styles>
        </>
);}