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
    <Container fluid className="pt-5">
        <Row  style={{"padding":"30px"}}>
            <Col lg={4} className="pb-1">
                 <div className="cat-item d-flex flex-column border mb-4" style={{"padding":"30px"}}>
                    <p className="text-right">15 Products</p>
                    <a href="" className="cat-img position-relative overflow-hidden mb-3">
                        <img className="img-fluid" src="img/cat-1.jpg" alt=""/>
                    </a>
                    <h5 className="font-weight-semi-bold m-0">Men's dresses</h5>
                </div>
            </Col>
            <Col lg={4} className="pb-1">
                    <div className="cat-item d-flex flex-column border mb-4" style={{"padding":"30px"}}>
                        <p className="text-right">15 Products</p>
                        <a href="" className="cat-img position-relative overflow-hidden mb-3">
                            <img className="img-fluid" src="img/cat-2.jpg" alt="" />
                        </a>
                        <h5 className="font-weight-semi-bold m-0">Women's dresses</h5>
                    </div>
            </Col>
            <Col lg={4} className="pb-1">
                    <div className="cat-item d-flex flex-column border mb-4" style={{"padding":"30px"}}>
                            <p className="text-right">15 Products</p>
                            <a href="" className="cat-img position-relative overflow-hidden mb-3">
                                <img className="img-fluid" src="img/cat-3.jpg" alt="" />
                            </a>
                            <h5 className="font-weight-semi-bold m-0">Baby's dresses</h5>
                    </div>
            </Col>
            <Col lg={4} className="pb-1">
                    <div className="cat-item d-flex flex-column border mb-4" style={{"padding":"30px"}}>
                            <p className="text-right">15 Products</p>
                            <a href="" className="cat-img position-relative overflow-hidden mb-3">
                                <img className="img-fluid" src="img/cat-4.jpg" alt=""/>
                            </a>
                            <h5 className="font-weight-semi-bold m-0">Accerssories</h5>
                        </div>
            </Col>
            <Col  lg={4} className="pb-1">
                <div className="cat-item d-flex flex-column border mb-4"  style={{"padding":"30px"}}>
                        <p className="text-right">15 Products</p>
                        <a href="" className="cat-img position-relative overflow-hidden mb-3">
                            <img className="img-fluid" src="img/cat-5.jpg" alt="" />
                        </a>
                        <h5 className="font-weight-semi-bold m-0">Bags</h5>
                    </div>
            </Col>
            <Col lg={4} className="pb-1">
                <div className="cat-item d-flex flex-column border mb-4" style={{"padding":"30px"}}>
                    <p className="text-right">15 Products</p>
                    <a href="" className="cat-img position-relative overflow-hidden mb-3">
                        <img className="img-fluid" src="img/cat-6.jpg" alt=""/>
                    </a>
                    <h5 className="font-weight-semi-bold m-0">Shoes</h5>
                </div>
            </Col>
        </Row>
    </Container>
    <Container fluid className="pt-5 offer" >
        <Row style={{"padding":"30px"}}>
            <Col lg={6} md={6}>
                <div className="position-relative bg-secondary text-center text-md-right text-white mb-2 py-5 px-5">
                    <img src="img/offer-1.png" alt="" />
                    <div className="position-relative" style={{"z-index":"1"}}>
                        <h5 className="text-uppercase text-primary mb-3">20% off the all order</h5>
                        <h1 className="mb-4 font-weight-semi-bold">Spring Collection</h1>
                        <a href="" className="btn btn-outline-primary py-md-2 px-md-3">Shop Now</a>
                    </div>
                </div>
            </Col>
            <Col lg={6} md={6}>
                
            <div className="position-relative bg-secondary text-center text-md-left text-white mb-2 py-5 px-5">
                    <img src="img/offer-2.png" alt="" />
                    <div className="position-relative"style={{"z-index":"1"}} >
                        <h5 className="text-uppercase text-primary mb-3">20% off the all order</h5>
                        <h1 className="mb-4 font-weight-semi-bold">Winter Collection</h1>
                        <a href="" className="btn btn-outline-primary py-md-2 px-md-3">Shop Now</a>
                    </div>
                </div>



            </Col>
        </Row>
    </Container>
            </>)
}

export default Homepage;