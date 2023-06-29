import React,{ useContext, useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Button, Container, Row, Col} from 'react-bootstrap';
//import UserContaxt from '../contaxts/user-contaxt';

import {UserLogin} from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import Alert from "react-bootstrap/Alert";
import { setLoginDetails,LOGIN } from "../action/common";
import { useStateValue } from '../contaxts/AppContaxt';

const Login=()=>{



    const navigate=useNavigate();
    const containerStyle={
        "border":"2px solid #ddd",
        "borderRadius":"10px"
    }

    const [initialState,updateLoginDetails]=useStateValue();

    const [validated, setValidated] = useState(false);
    const [errorMessage,setErrorMessage]=useState({});
    
    const [formData,setFormData]=useState({email:"",password:""});

    const handleFormData=(e)=>{       
        const {target:{name,value}}=e;       
        setFormData({...formData,[name]:value});              
    }

    const fromSubmit=(e)=>{
        e.preventDefault();
        const form = e.currentTarget;
        let formValidateStatus=true;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            formValidateStatus=false  
        }
        setValidated(true);
        if(formValidateStatus){
            UserLogin(formData)
            .then(result=>{
                if(result.status==200)
                {   setLoginDetails(updateLoginDetails,{type:LOGIN,data:result});
                    navigate("/dashboard");
                }else{
                    setErrorMessage(result.message);
                }
            });
        }
        
    }
    
    return (
        <>
            <Container>
                <Row  className='mb-5 mt-5'  >
                   
                    <Col className='p-5' md={{ span: 5, offset: 3 }}  style={containerStyle} >
                       { errorMessage.length>0 &&  <div><Alert variant="danger" >{errorMessage }</Alert></div> }   
                <Form noValidate validated={validated} onSubmit={fromSubmit} type="post">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" name="email" value={formData.email} onChange={handleFormData} required  />
                        <Form.Control.Feedback type="invalid">Please enter email id</Form.Control.Feedback>
                        
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleFormData} required />
                        <Form.Control.Feedback  type="invalid">Please enter password</Form.Control.Feedback>
                        
                    </Form.Group>
                    <Button variant="primary" className='pull-right' type='submit' >
                        Login
                    </Button>
                </Form>
                </Col>
               
                </Row>
            </Container>
        </>
    )
}

export default Login;