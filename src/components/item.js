import React from "react";
import {Col, Card, Button} from 'react-bootstrap';

export const Item = (props) => {

    const setName = () => {
        props.func(props.post.button)
    }

    return(
        <>
                    <Col>
                        <Card style={{ width: '18rem', height: '450px' }}>
                            <Card.Img variant="top" src={props.post.img} />
                            <Card.Body className="post">
                                <Card.Title>{props.post.title}</Card.Title>
                                <Card.Text>{props.post.text}</Card.Text>
                                <Button variant="primary" onClick={setName}>{props.post.button}</Button>
                            </Card.Body>
                        </Card>
                    </Col>
        </>
    )
}