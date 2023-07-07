import React, { useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import { useRedirect } from '../../action/common';


const Header=(props)=>{

    let { handleRedirect } =useRedirect();

    return (<>
    
           <Navbar bg="primary" variant="dark">
                <Container>
                <Navbar.Brand href='javascript:void(0);' onClick={()=>{handleRedirect('/admin/dashboard')}} >My App</Navbar.Brand>
                <Nav className="me-auto">
                        <NavDropdown title="Master" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={()=>{ handleRedirect('/admin/master/category') }}>Category</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{ handleRedirect('/master/bmv')}} >BMV</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4"> Separated link</NavDropdown.Item>
                        </NavDropdown>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Nav>
                <NavDropdown title={props.userDetails.username} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#login" onClick={props.logout} >Logout</NavDropdown.Item>
                    
                    {/* <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
                    </NavDropdown.Item> */}
                    </NavDropdown>
                </Nav>
                </Container>
            </Navbar>
           
    </>)
}

export default Header;
