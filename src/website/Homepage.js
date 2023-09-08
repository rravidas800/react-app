import React from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";

const Homepage=()=>{
    return (<>
    <Row>
        <Col lg={3}></Col>
            <Col lg={9} style={{width:"72.5%"}}>
                <Container className="" style={{"position":"relative","top":"-7px"}}>
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
    <Container fluid className="pt-5"> 
        <Row style={{"padding":"30px"}}>
            <Col lg="3">
                <div className="d-flex align-items-center border mb-4" style={{"padding":"30px"}}>
                    <h1 className="fa fa-check text-primary m-0 mr-3"></h1>
                    <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
                </div>
            </Col>
            <Col lg="3">
                <div className="d-flex align-items-center border mb-4" style={{"padding":"30px"}}>
                    <h1 className="fa fa-shipping-fast text-primary m-0 mr-3"></h1>
                    <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
                </div>
            </Col>
            <Col lg="3">
                <div className="d-flex align-items-center border mb-4" style={{"padding":"30px"}}>
                    <h1 className="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                    <h5 className="font-weight-semi-bold m-0">14-Day Return</h5>
                </div>
            </Col>
            <Col lg="3">
                <div className="d-flex align-items-center border mb-4" style={{"padding":"30px"}}>
                    <h1 className="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                    <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
                </div>
            </Col>
        </Row>
    </Container>
            </>)
}

export default Homepage;