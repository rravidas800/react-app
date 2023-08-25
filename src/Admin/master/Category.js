import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Alert, Form, Nav, Row } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import { getLocalStorageData, useRedirect } from "../../action/common";
import {saveCategory, getAllCategory} from '../../services/common.service'; 
import { useNavigate, useParams } from "react-router-dom";


const  Category=()=>{

    const  {id} =useParams();
    
    let { handleRedirect } =useRedirect();
    const navigate=useNavigate();
    const [category,setCategory]=useState("");
    const [errorMessage,setErrorMessage]=useState("");


    const handleFormField=()=>{

    }


    const saveCategoy=(e)=>{
        e.preventDefault();
        let localStorageData=getLocalStorageData();
        let formData=new FormData(e.currentTarget);
        if(id)
        {
            formData.append('_id',id);
        }
        
       /*  let formData={
            "category":category,
            "_id":id?id:"",
            "accessToken":localStorageData.accessToken
        } */
        saveCategory(formData)
        .then(result=>{
            
            if(result){
                navigate('/admin/master/category/view',{state:result});
            }else{
                setErrorMessage("Failed to save record!");
            }
            
        })
        .catch(err=>{
            setErrorMessage("Failed to save record!");
        });
        
    }

    const fectCategoryByid=async(catId)=>{
        let localStorageData=getLocalStorageData();
        let seacrhParam={
                "searchParam":{
                    "_id":catId
                },
                "accessToken":localStorageData.accessToken
        }
        await getAllCategory(seacrhParam)
        .then(result=>{
            if(result.status==='success')
            {
                setCategory(result.result[0].category);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{
        if(id)
        {
            fectCategoryByid(id);
        }
    },[])


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
                                        <Col sm={8}><Form.Control type="text" name="category" onChange={(e)=>{setCategory(e.target.value)}}  value={category} placeholder="Category" /></Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                        <Form.Label column sm={4}>Image</Form.Label>
                                        <Col sm={8}><Form.Control type="file" name="item_image" onChange={handleFormField} /></Col>
                                    </Form.Group>
                                    

                                    <Col className="ml-1" sm={8} md={{offset: 4 }}>
                                        <Button type="submit">{ id?'Update':'Submit' }</Button>
                                    </Col>
                            </Form>
                    </Col>
                    </Row>
                </div>
            </div>)
}
export default Category;