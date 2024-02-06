import React from "react";
import { SwitchTab } from "./switchTab";
import { Col, Container, Row } from "react-bootstrap";
import Space from "../Space.jpg";

export function Statistics(){

    let longtext = "The virus is spread by airborne droplets of virus inhaled by coughing, "
                    +"sneezing or talking, or by contact with virus on surfaces and then "
                    +"entering the eyes, nose or mouth. Masks are the primary means of "
                    +"preventing the spread of infection, but should be used in conjunction "
                    +"with a range of other preventive measures, including keeping a safe "
                    +"distance and avoiding confined spaces with large numbers of people. "
                    +"Effective preventive measures include frequent hand washing and respiratory hygiene practices"
    
    let longtext2 = "The task was quite interesting to do. JavaScript and other functional"
                    +"languages are not my environment and most of my time learning programming "
                    +"has been in Java and C++. During the task I learned quite a lot of "
                    +"new things not only about the language itself, but also with interest "
                    +"learned the React library, work with layout and creating a visual structure "
                    +"of its elements that contain data. I really want to continue to master "
                    +"this direction and learn to work at a professional level. "
                    +"Teamwork, routine, project complexity is what I need to get "
                    +"to the next level! I will accept any feedback and try to do my best to grow."

    return(
        <>
            <Container style={{display: "flex", marginLeft: "10vw", minHeight: "87.3vh", minWidth: "50vw"}}>
                <SwitchTab></SwitchTab>
                <Container style={{marginBottom: "30px"}}>
                    <Row>
                        <Col md={7} style={{minWidth: "auto", width: "auto", margin: "20px"}}>
                            <h2>Covid-19 Data </h2>
                            <p>
                                {longtext}
                            </p>

                        </Col>
                        <Col md={5}  style={{minWidth: "auto", width: "auto", margin: "20px"}}>
                            <h2>Author's comment</h2>
                            <p>
                                {longtext2}
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Container> 
            
        </>
    )
}