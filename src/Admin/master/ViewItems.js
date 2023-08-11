import React, { useEffect, useState } from "react";
import { FILE_URL } from "../../action/common";
import { Alert, Col, Nav, Row, Modal, Button } from "react-bootstrap";
import { getLocalStorageData, useRedirect, PAGE_LIMIT } from "../../action/common";
import { Link, useLocation } from "react-router-dom";
import { getAllItems,deleteItemById } from "../../services/common.service";
import { Pagination } from "react-bootstrap";




const ViewItems=()=>{

    let { handleRedirect } =useRedirect();
    const { state  }=useLocation();
    const [locationState,setLocationState]=useState(state);

    const [showModal,setShowModal]=useState(false);
    const handleModalClose = () => setShowModal(false);
   
    const [itemDetailsModal,setItemDetailsModel]=useState({});
    const [itemsList,setItemsList]=useState({});
    const [current_page,setCurrentPage]=useState(1);
    const [totalPages,setTotalPages]=useState(0);

    let localStorageData=getLocalStorageData();

    /*-------get Item Details---------*/
    const showItemDetails=async(itemId)=>{
        setShowModal(true);
        let parmas={
            searchParam:{_id:itemId}
        }
        try{
            await getAllItems(parmas).then(result=>{
                if(result)
                {
                    if(result.result[0].item_image.length===undefined)
                    {
                        var imgData=JSON.stringify(result.result[0].item_image);
                        imgData="["+imgData+"]";
                        result.result[0].item_image=JSON.parse(imgData);
                    }
                    setItemDetailsModel(result.result[0]);
                    //console.log("Final Data=>",itemDetailsModal);
                 
                }else{
                    setItemDetailsModel([]);
                }
             })
             .catch(err=>{
                setItemDetailsModel([]);
             })
        }catch(err){
            setItemDetailsModel([]);
        }
      
         
    }
    /*----------End---------*/


    const fetchItemList=async(current_page)=>{
        let parmas={
            pageNumber:current_page,
            limit:PAGE_LIMIT
        }
       
        try{
            await getAllItems(parmas).then(result=>{
                if(result)
                {
                    setItemsList(result.result);
                    setTotalPages(result.total_page);
                 
                }else{
                    setItemsList([]);
                }
             })
             .catch(err=>{
                setItemsList([]);
             })
        }catch(err){
            setItemsList([]);
        }
    }
    
    const handlePageClick = (pageNumber) => {
      if(pageNumber>0 && pageNumber<=totalPages){  setCurrentPage(pageNumber); }  
    };

    const deleteItems=(id,slNo)=>{
        const deleteParams={
            "_id":id,
            accessToken:localStorageData.accessToken
        }
        deleteItemById(deleteParams).
        then(result=>{
            if(result)
            {
                if((pageNo+1)==slNo)
                {
                    setCurrentPage(current_page-1);   
                }else{
                    fetchItemList(current_page); 
                }
            }
        }).catch(err=>{

        })
    }

    window.history.replaceState({},'');
    setTimeout(()=>{
        setLocationState(null);
    },3000);

    useEffect(()=>{
        fetchItemList(current_page);
    },[current_page])
    
    const pageNo=(parseInt(current_page)*parseInt(PAGE_LIMIT))-parseInt(PAGE_LIMIT);
    let i=pageNo;

    return (
        <div>
        <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link   onClick={()=>{ handleRedirect("/admin/master/item") }} >Manage Item</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link active onClick={()=>{ handleRedirect("/admin/master/item/view") }}>View Item</Nav.Link>
            </Nav.Item>
        </Nav>
        <div className="p-5">
        { (locationState && locationState.status.length>0) && <Alert variant="success" dismissible>{ locationState.message } </Alert> }
            <Row className="justify-content-md-center">
                <Col lg="12">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Sl No.</th>
                                <th>Category</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th className="text-center" colSpan={3}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        { itemsList.length>0  ? itemsList.map(val=>{
                              return  <tr key={i}>
                                    <td>{++i}</td>
                                    <td>{val.category.category}</td>
                                    <td>{val.item_name}</td>
                                    <td>{val.price}</td>
                                    <td>{(val.item_image.item_image!="") && <img  height="50px" src={ FILE_URL+'uploads/'+ val.item_image.item_image } /> }</td>
                                    <td align="center"><Link size="sm" title="View"  onClick={()=>{showItemDetails(val._id)}}><i className="fa fa-eye"></i></Link></td>
                                    <td align="center"><Link size="sm" title="Edit" to={`/admin/master/item/edit/${val._id}`} ><i className="fa fa-edit"></i></Link></td>
                                    <td align="center">
                                    <Link size="sm"  title="Delete"  onClick={()=>{deleteItems(val._id,i)}} ><i className="fa fa-trash-alt"></i></Link></td>
                                </tr>
                            }): <tr key={i}><td colSpan={6} align="center">No Record Found!</td></tr> }
                        </tbody>
                    </table>
                    { itemsList.length>0 &&
                    <Pagination>
                            <Pagination.First onClick={() => handlePageClick(1)} />
                            <Pagination.Prev  onClick={() => handlePageClick(current_page - 1)} />
                            {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item
                                key={index}
                                active={index + 1 === current_page}
                                onClick={() => handlePageClick(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                            ))}
                            <Pagination.Next onClick={() => handlePageClick(current_page + 1)} />
                            <Pagination.Last onClick={() => handlePageClick(totalPages)}  />
                    </Pagination>
                    }
                 </Col>
            </Row>
       
        <Modal show={showModal} onHide={handleModalClose}  size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Item Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row> <Col lg="12">
                    <table className="table table-bordered table-striped">
                        <tbody>
                        <tr>
                            <td>Item Name</td>
                            <td>{ itemDetailsModal.item_name?itemDetailsModal.item_name:"--" }</td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td>{ itemDetailsModal.category?itemDetailsModal.category.category:"--" }</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>{ itemDetailsModal.price?"Rs."+itemDetailsModal.price:"--" }</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{ itemDetailsModal.description?itemDetailsModal.description:"--" }</td>
                        </tr>
                        <tr>
                            <th colSpan={2}>Images</th>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                            { (itemDetailsModal.item_image && itemDetailsModal.item_image.length>0) &&  itemDetailsModal.item_image.map((imgList,index)=>{
                                return <img  key={index} height="100px" src={ FILE_URL+'uploads/'+ imgList.item_image } />
                            }) }
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </Col>
                    </Row>
            </Modal.Body>
        </Modal>
        </div>
        </div>
    )
}

export default ViewItems;