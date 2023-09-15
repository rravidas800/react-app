import React, { useEffect } from "react";
import { FILE_URL, useRedirect } from "../../action/common";
import { useState } from "react";
import { Alert, Button, Col, Form, Nav, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { saveBannerForm,getAllBanner } from "../../services/common.service";


const Banner=()=>{
    const {id} =useParams();
    
    let { handleRedirect } =useRedirect();
    let navigateToUrl=useNavigate();
    const [bannerDetails,setBannerDetails]=useState({});
    const [errorMessage,setErrorMessage]=useState("");


    const saveBanner=(e)=>{
        e.preventDefault();
        
        const formData=new FormData(e.currentTarget);
        if(id)
        {
            formData.append("_id",id);
        }

         saveBannerForm(formData)
        .then((result)=>{
            if(result && result.status=='success')
            {
                navigateToUrl('/admin/master/banner/view',{state:result});
            }else if(result.status='failed'){
                setErrorMessage(result.status.message);
            }else{
                setErrorMessage("Something went wrong! try again later");
            }
        })
        .catch(err=>{
            setErrorMessage("Something went wrong! try again later");
        })

    }    
    const handleFormField=()=>{

    }  
    
   const getBannerById=(id)=>{
    
        getAllBanner({searchParam:{_id:id}})
        .then(result=>{
            if(result.status=="success")
            {
                setBannerDetails(result.result[0]);                
            }
        })
        .catch(err=>{
            
        })
    }

    useEffect(()=>{
        if(id)
        {
            getBannerById(id);
            console.log(bannerDetails);
        }
    },[id])


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
                        { errorMessage &&  <div><Alert variant="danger" >{errorMessage }</Alert></div> }  
                            <Form method="post"  onSubmit={saveBanner}>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalTitle">
                                        <Form.Label column sm={4}>Title </Form.Label>
                                        <Col sm={8}><Form.Control type="text" name="title"  placeholder="Enter Title" defaultValue={ (bannerDetails) && bannerDetails.title } /></Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalLink">
                                        <Form.Label column sm={4}>Link</Form.Label>
                                        <Col sm={8}><Form.Control type="text" name="banner_link"  placeholder="http://www.abc.com" defaultValue={ (bannerDetails) && bannerDetails.banner_link } /></Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalDescription">
                                        <Form.Label column sm={4}>Description</Form.Label>
                                        <Col sm={8}><Form.Control as="textarea" rows={3} placeholder="Enter Description" name="description" defaultValue={ (bannerDetails) && bannerDetails.description } /></Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalImage">
                                        <Form.Label column sm={4}>Image</Form.Label>
                                        <Col sm={8}>
                                            <Form.Control type="file" name="banner_image" onChange={handleFormField} />
                                            {
                                                (Object.keys(bannerDetails).length>0) && <div>
                                                    <img className="img-edit" height="50px" src={ FILE_URL+'uploads/'+ bannerDetails.banner_image } alt="" />
                                                </div>
                                            }
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" >
                                        <Form.Label column sm={4}></Form.Label>
                                        <Col sm={8}>
                                             <Button type="submit" >{ id?'Update':'Submit' }</Button>
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