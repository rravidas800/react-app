import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';


const Header=(props)=>{
    const redirectUrl=useNavigate();
    /* const nav = useNavigate();   
    const logout=()=>{
        try{
             console.log("logout click");
             localStorage.removeItem("user");
             nav("/login");
            
        }catch(e){
             console.log(e.message);
        }
    } */
    const redirectTo=(url)=>{
        redirectUrl(url);
    }

    return (<>
    
           <Navbar bg="primary" variant="dark">
                <Container>
                <Navbar.Brand href='javascript:void(0);' onClick={()=>{ redirectTo('/admin/dashboard') }} >My App</Navbar.Brand>
                <Nav className="me-auto">
                        <NavDropdown title="Master" id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={()=>{ redirectTo('/admin/master/category') }}>Category</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>{ redirectTo('/master/bmv') }} >BMV</NavDropdown.Item>
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
