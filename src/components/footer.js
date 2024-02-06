import React from "react";
import { Container } from "react-bootstrap";

export const Footer = () => (
    <Container fluid style={{backgroundColor: '#212529', color: '#fff'}}>
        <Container style={{display: "flex", justifyContent: "space-between", padding: "10px"}}>
            <p>Made by Maxim Kraval. Beginning developer seeking to take on the role of Junior Developer</p>
            <p>Contacts: +37120066586 / Slaiderx55@gmail.com</p>
        </Container>
    </Container>
)