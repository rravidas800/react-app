import React from "react";
import { Col, Row } from "react-bootstrap";

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge';
import '../css/website-style.css';



const Header=()=>{
    return (<>
            <Container fluid className="nav-container">
                <Row>
                    <Col xs lg="3" >
                       <a href="" className="text-decoration-none">
                        <h1>
                            <span className="text-primary font-weight-bold border px-3 mr-1">E</span> <span className="cmp-name">Shopper</span>
                        </h1>
                        </a> 
                    </Col>
                    <Col xs lg="6" className="pt-2" >
                        <Form inline>
                            <InputGroup>
                            <Form.Control className="header-search-box"
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                             <InputGroup.Text id="basic-addon1" className="text-primary header-search-box"><i className="fa fa-search "></i></InputGroup.Text>
                            </InputGroup>
                        </Form>
                    </Col>
                    <Col xs lg="3" className="pt-1 text-right">                   
                            <a href="" className="btn border m-1" >
                                <i class="fas fa-heart text-primary"></i>
                                <Badge bg="light" text="dark" >0</Badge>
                            </a>
                            <a href="" className="btn border  m-1">
                                <i class="fas fa-shopping-cart text-primary"></i>
                                <Badge bg="light" text="dark" >0</Badge>
                            </a>
                    </Col>
                </Row>
            </Container>

              
            <Container fluid >
                <Row>
                    <Col xs lg="3" style={{paddingRight:"0px"}}>
                    <Navbar  className="bg-body-tertiary menu-container" >
                                <Navbar.Collapse   id="basic-navbar-nav" style={{width:"100%"}}>
                                <Nav className="me-auto" >
                                    <NavDropdown className="justify-content-between" show title="Categories" id="categories-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">
                                        Separated link
                                    </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                       
                    </Navbar>
                    </Col>
                    <Col xs lg="9" style={{paddingLeft:"0px","paddingRight":"1.3rem"}}>
                    <Navbar expand="lg" className="bg-body-tertiary menu-container2">
                            <Container fluid >
                                
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link href="#home" className="nav-menu-items">Home</Nav.Link>
                                        <Nav.Link href="#link" className="nav-menu-items">Link</Nav.Link>
                                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">
                                            Another action
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action/3.4">
                                            Separated link
                                        </NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                                <Navbar.Collapse className="justify-content-end">
                                        <Nav.Link href="#home" className="nav-menu-items">Login</Nav.Link>
                                        <Nav.Link href="#link" className="nav-menu-items">Register</Nav.Link>
                                    {/* <Navbar.Text>
                                        Signed in as: <a href="#login">Mark Otto</a>
                                    </Navbar.Text> */}
                                </Navbar.Collapse>
                        </Container>
                    </Navbar>

                    </Col>
                </Row>
            </Container>

             
            </>
           );
}

export default Header;