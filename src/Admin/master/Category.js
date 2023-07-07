import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Alert, Form, Nav, Row } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import { getLocalStorageData, useRedirect } from "../../action/common";
import {saveCategory} from '../../services/common.service'; 
import { useNavigate } from "react-router-dom";


const  Category=()=>{

    let { handleRedirect } =useRedirect();
    const navigate=useNavigate();
    const [category,setCategory]=useState("");
    const [errorMessage,setErrorMessage]=useState("");

    const saveCategoy=(e)=>{
        e.preventDefault();
        let localStorageData=getLocalStorageData();
        
        let formData={
            "category":category,
            "accessToken":localStorageData.accessToken
        }
        saveCategory(formData)
        .then(result=>{
            navigate('view',{state:{"status":"success"}});
        })
        .catch(err=>{
            setErrorMessage("Failed to save record");
        });
        
    }

    return (<div>
                <Nav variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link active  >Manage Category</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link  onClick={()=>{ handleRedirect("/admin/master/category/view") }}>View Category</Nav.Link>
                    </Nav.Item>
                </Nav>
                <div className="p-5">
                    <Row className="justify-content-md-center">
                        <Col lg="8">
                        { errorMessage.length>0 &&  <div><Alert variant="danger" >{errorMessage }</Alert></div> }  
                            <Form method="post"  onSubmit={saveCategoy}>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                        <Form.Label column sm={4}>Category</Form.Label>
                                        <Col sm={8}><Form.Control type="text" name="category" onChange={(e)=>{setCategory(e.target.value)}}  placeholder="Category" /></Col>
                                    </Form.Group>
                                    <Col className="ml-1" sm={8} md={{offset: 4 }}>
                                        <Button type="submit">Submit</Button>
                                    </Col>
                            </Form>
                    </Col>
                    </Row>
                </div>
            </div>)
}
export default Category;