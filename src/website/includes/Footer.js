import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer=()=>{
    return (<>
    <Container fluid className='bg-secondary'>
            <Row className='px-xl-5 pt-5'>
                <Col lg={4} md={12}>
                    <a href="" className="text-decoration-none">
                        <h1 className="mb-4 display-5 font-weight-semi-bold">
                            <span className="text-primary font-weight-bold border border-white px-3 mr-1">E</span>Shopper</h1>
                    </a>
                    <p>Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no sit erat lorem et magna ipsum dolore amet erat.</p>
                    <p className="mb-2"><i class="fa fa-map-marker-alt text-primary mr-3"></i>123 Street, New York, USA</p>
                    <p className="mb-2"><i class="fa fa-envelope text-primary mr-3"></i>info@example.com</p>
                    <p className="mb-0"><i class="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890</p>
                </Col>
            
                <Col lg={8} md={12}>
                    <Row>
                        <Col lg={4} className='mb-5' >
                            <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
                            <div className="d-flex flex-column justify-content-start">
                                <a className="text-dark mb-2" href="index.html"><i className="fa fa-angle-right mr-2"></i>Home</a>
                                <a className="text-dark mb-2" href="shop.html"><i className="fa fa-angle-right mr-2"></i>Our Shop</a>
                                <a className="text-dark mb-2" href="detail.html"><i className="fa fa-angle-right mr-2"></i>Shop Detail</a>
                                <a className="text-dark mb-2" href="cart.html"><i className="fa fa-angle-right mr-2"></i>Shopping Cart</a>
                                <a className="text-dark mb-2" href="checkout.html"><i className="fa fa-angle-right mr-2"></i>Checkout</a>
                                <a className="text-dark" href="contact.html"><i className="fa fa-angle-right mr-2"></i>Contact Us</a>
                            </div>
                        </Col>
                        <Col lg={4} className='mb-5' >
                            <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
                            <div className="d-flex flex-column justify-content-start">
                                <a className="text-dark mb-2" href="index.html"><i className="fa fa-angle-right mr-2"></i>Home</a>
                                <a className="text-dark mb-2" href="shop.html"><i className="fa fa-angle-right mr-2"></i>Our Shop</a>
                                <a className="text-dark mb-2" href="detail.html"><i className="fa fa-angle-right mr-2"></i>Shop Detail</a>
                                <a className="text-dark mb-2" href="cart.html"><i className="fa fa-angle-right mr-2"></i>Shopping Cart</a>
                                <a className="text-dark mb-2" href="checkout.html"><i className="fa fa-angle-right mr-2"></i>Checkout</a>
                                <a className="text-dark" href="contact.html"><i className="fa fa-angle-right mr-2"></i>Contact Us</a>
                            </div>
                        </Col>
                        <Col lg={4} className='mb-5'>
                           
                            <h5 className="font-weight-bold text-dark mb-4">Newsletter</h5>
                            <form action="">
                                <div className="form-group">
                                    <input type="text" class="form-control border-0 py-4" placeholder="Your Name" required="required" />
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control border-0 py-4" placeholder="Your Email" required="required" />
                                </div>
                                <div>
                                    <button className="btn btn-subscribe btn-block border-0 py-3" type="submit">Subscribe Now</button>
                                </div>
                            </form>
                        
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    </>);
}

export default Footer