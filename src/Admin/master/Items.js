import React,{ useState, useEffect} from "react";
import Button from "react-bootstrap/Button";
import { Alert, Form, Nav, Row } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import { getLocalStorageData, useRedirect } from "../../action/common";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategory,saveItemData } from "../../services/common.service";
import axios from "axios";

const Items=()=>{
    const  {id} =useParams();

    let { handleRedirect } =useRedirect();
    const [errorMessage,setErrorMessage]=useState("");
    const [categoryList,setCategoryList]=useState({});

    const [formPostData,setFormPostData]=useState({});
    const [itemImage,setItemImage]=useState("");
    //const formFields = new FormData();

    /*------fill form data with form element----*/
    const handleFormField=(e)=>{
        const {target:{name,value}}=e;
        
        if(name=='item_image')
        {
            setItemImage(e.target.files[0]);          
        }else{
            setFormPostData({...formPostData,[name]:value});
        }
    }   
    /*-------end------------*/

    /*-----Fetch Categories----*/
    let localStorageData=getLocalStorageData();

    const fetchCategoryList=async()=>{
        let parmas={
            accessToken:localStorageData.accessToken,
        }
        try{
            await getAllCategory(parmas).then(result=>{
                if(result)
                {
                    console.log(result.result);
                    setCategoryList(result.result);
                }else{
                    setCategoryList([]);
                }
             })
             .catch(err=>{
                setCategoryList([]);
             })
        }catch(err){
            setCategoryList([]);
        }
    }
    
    /*-------end--------*/


    const saveItem=(e)=>{
        e.preventDefault();
      
        const formFields = new FormData();
      
        formFields.append('item_image',itemImage);
        
        Object.entries(formPostData).forEach(entry => {
            const [key, value] = entry;
            formFields.append(key,value);
        });

        saveItemData(formFields).
        then(result=>{
            console.log(result);
        })
        .catch(err=>{
            console.log(err)
        })

       /*  formData.map((val,ind)=>{
            console.log(val,"--",ind);
        }) */
       // formFields.append('formInput',"test")
       // console.log(formFields);
    }

    useEffect(()=>{
        fetchCategoryList();
    },[])
    return (<div>
        <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link active  >Manage Item</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  onClick={()=>{ handleRedirect("/admin/master/item/view") }}>View Items</Nav.Link>
            </Nav.Item>
        </Nav>
        <div className="p-5">
            <Row className="justify-content-md-center">
                <Col lg="8">
                { errorMessage.length>0 &&  <div><Alert variant="danger" >{errorMessage }</Alert></div> }  
                    <Form type="post" onSubmit={saveItem} >
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridItemName">
                                    <Form.Label>Item Name</Form.Label>
                                    <Form.Control type="input" name="item_name" onChange={handleFormField} placeholder="Enter item name" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select defaultValue="--Select--" name="category_id" onChange={handleFormField}>
                                        <option>--Select--</option>
                                       {  categoryList.length &&
                                            categoryList.map((item)=>{
                                                return <option key={item._id} value={item._id} >{item.category}</option>
                                            })
                                        } 
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridImage">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="file" name="item_image" onChange={handleFormField} />                                
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridImage">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control  name="price" placeholder="Enter price" onChange={handleFormField} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Enter Description" name="description" onChange={handleFormField} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Col xs={10 } >
                                    <Button variant="primary" type="submit" className="float-end">Submit</Button>
                                </Col>
                                <Col xs={2} >
                                    <Button variant="danger" className="float-end">Cancel</Button>                               
                                </Col>
                            </Row>
                    </Form>
            </Col>
            </Row>
        </div>
    </div>)
}

export default Items;