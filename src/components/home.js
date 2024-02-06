import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useState} from "react";
import { useNameing } from './hooks/useNaming'
import { Slider } from "./slider";
import { Item } from "./item.js";

import Loost from "../Loost.png";
import Female from "../Female.png";
import Art from "../Art.jpg";
import Space from "../Space.jpg";


export function Home() {

    const [post, setPost] = useState([
        {id: 1, img: Loost, title: "Example item", text: "Filler element!", button: "Useless button"},
        {id: 2, img: Female, title: "Nice Art", text: "Example lower text", button: "Useless button"},
        {id: 3, img: Art, title: "Another one", text: "How many drawings did he put in here?", button: "Useless button"},

    ])
    const newName = useNameing("React site");

    return(
        <>
            <Slider/>
            <Container style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
                <Row>
                    {post.map(post =>
                        <Item post={post} key={post.id} func={newName.ChangeSiteName}/>
                        )}
                </Row>
            </Container>
            <Container style={{marginBottom: "30px"}}>
                <Row>
                    <Col md={7}>
                        <img src={Space} height={400} alt="Space"/>

                    </Col>
                    <Col md={5}>
                        <h2>Full poster</h2>
                        <p>
                            The page is made while studying various materials,
                            is not author's style and performs a fill-in role.
                            The test task can be found in the Covid-19 Statistics tab
                        </p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}