import React from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";

const Homepage=()=>{
    return (<>
    <Row>
        <Col lg={3}></Col>
            <Col lg={9} style={{width:"72.5%"}}>
                <Container className="" style={{position:"relative",top:"-7px"}}>
                    <Carousel>
                        <Carousel.Item interval={4000}>
                            <img src="/img/carousel-1.jpg" text="First slide" />
                            <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={4500}>
                            <img src="/img/carousel-2.jpg" text="Second slide" />
                            <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    
                        </Carousel>
                </Container>
            </Col>
    </Row>
            </>)
}

export default Homepage;