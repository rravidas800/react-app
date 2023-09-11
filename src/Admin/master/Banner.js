import React from "react";
import { useRedirect } from "../../action/common";
import { useState } from "react";
import { Alert, Button, Col, Form, Nav, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";


const Banner=()=>{
    const  {id} =useParams();
    let { handleRedirect } =useRedirect();
    const [errorMessage,setErrorMessage]=useState("");


    const saveBanner=()=>{

    }    
    const handleFormField=()=>{

    }                                   

    return (<>
            <div>
                <Nav variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link active  >Manage Banner</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link  onClick={()=>{ handleRedirect("/admin/master/banner/view") }}>View Banner</Nav.Link>
                    </Nav.Item>
                </Nav>
                <div className="p-5">
                    <Row className="justify-content-md-center">
                        <Col lg="8">
                        { errorMessage.length>0 &&  <div><Alert variant="danger" >{errorMessage }</Alert></div> }  
                            <Form method="post"  onSubmit={saveBanner}>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalTitle">
                                        <Form.Label column sm={4}>Title</Form.Label>
                                        <Col sm={8}><Form.Control type="text" name="title"  placeholder="Title" /></Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalDescription">
                                        <Form.Label column sm={4}>Description</Form.Label>
                                        <Col sm={8}><Form.Control type="text" name="description" placeholder="Description" /></Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalImage">
                                        <Form.Label column sm={4}>Image</Form.Label>
                                        <Col sm={8}>
                                            <Form.Control type="file" name="item_image" onChange={handleFormField} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalSubmit">
                                        <Form.Label column sm={4}></Form.Label>
                                        <Col sm={8}>
                                             <Button type="submit">{ id?'Update':'Submit' }</Button>
                                        </Col>
                                    </Form.Group>
                                   
                            </Form>
                    </Col>
                    </Row>
                </div>
            </div>
    </>);
}

export default Banner;