import React, { useEffect, useState,useRef } from "react";
import { FILE_URL } from "../../action/common";
import { Alert, Col, Nav, Row, Modal, Button } from "react-bootstrap";
import { getLocalStorageData, useRedirect, PAGE_LIMIT } from "../../action/common";
import { Link, useLocation } from "react-router-dom";
import { getAllItems,deleteItemById,uploadMultipleImages,removeItemImage } from "../../services/common.service";
import { Pagination } from "react-bootstrap";





const ViewItems=()=>{

    let { handleRedirect } =useRedirect();
    const { state  }=useLocation();

    const inputFileRef=useRef(null);

    const [locationState,setLocationState]=useState(state);

    const [showModal,setShowModal]=useState(false);
    const handleModalClose = () => setShowModal(false);
   
    const [itemDetailsModal,setItemDetailsModel]=useState({});
    const [itemsList,setItemsList]=useState({});
    const [current_page,setCurrentPage]=useState(1);
    const [totalPages,setTotalPages]=useState(0);
    const [showLoader,setShowLoader]=useState(true);
    const [showContentDetails,setShowContentDetails]=useState(false);
    const [activeViewItem,setActiveViewItem]=useState("");

    const initialUploadBtntext=<span><i className="fa fa-upload"></i> Upload Images</span>;
    const [uploadBtnText,setUploadBtnText]=useState(initialUploadBtntext);
    const [imgUploadStatus,setImgUploadStatus]=useState({status:false,type:'',msg:""});



    /*------------Upload Multiple files----------*/
    const [chooseMultipleFile,setchooseMultipleFile]=useState([]);

    const handleFileUpload=(e)=>{
        setchooseMultipleFile(e.target.files);
    }

    const uploadMultipleFiles=()=>{
        setUploadBtnText(<span><i className="fa fa-spinner fa-spin"></i> Uploading...</span>);
        const formData=new FormData();
        for(let file of chooseMultipleFile)
        {
            formData.append('image',file);
        }
        formData.append("_id",activeViewItem);
        setchooseMultipleFile([]);
        uploadMultipleImages(formData)
        .then(result=>{
            setUploadBtnText(initialUploadBtntext);
            if(result)
            {
                showItemDetails(activeViewItem);
                fetchItemList(current_page); 
                setImgUploadStatus({status:true,type:'success',msg:'Success! images uploaded successfully'})     
            }else
            {
                setImgUploadStatus({status:true,type:'danger',msg:'Failed! failed to upload image'});  
            }
        })
        .catch(err=>{
            setImgUploadStatus({status:true,type:'danger',msg:err}) 
            setUploadBtnText(initialUploadBtntext);
        })


    }
    /*--------------end--------------*/

    let localStorageData=getLocalStorageData();

    /*----Loader style----*/
    const loaderStyle={
        "fontSize":"48px",
        "color":"blue"
    }
    /*------end-------*/

    /*-------get Item Details---------*/
    const showItemDetails=async(itemId)=>{
        setImgUploadStatus({status:false});
        setActiveViewItem("");
        setShowModal(true);
        setShowLoader(true);
        setShowContentDetails(false);
        let parmas={
            searchParam:{_id:itemId}
        }
        try{
            await getAllItems(parmas).then(result=>{
                if(result)
                {
                    setShowLoader(false);
                    setShowContentDetails(true);
                    setItemDetailsModel(result.result[0]);
                    setActiveViewItem(itemId);
                 
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


    /*-------Remove Image-----------*/
    const removeImage=(itemId,imageId)=>{
        console.log(itemId,imageId);
        let params={
            item_id:itemId,
            image_id:imageId
        }
        removeItemImage(params)
        .then(result=>{
            if(result){
                showItemDetails(activeViewItem);
                fetchItemList(current_page); 
                setImgUploadStatus({status:true,type:'success',msg:'Success! images removed successfully'})
            }else{
                setImgUploadStatus({status:true,type:'danger',msg:'Failed! failed to remove image'});  
            }
        })
        .catch(err=>{
            setImgUploadStatus({status:true,type:'danger',msg:err}) 
        })
    }
    /*-------end---------*/

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
                if((pageNo+1)===slNo)
                {
                    setCurrentPage(current_page-1);   
                }else{
                    fetchItemList(current_page); 
                }
            }
        }).catch(err=>{

        })
    }

    /*----- Open File choose on button click----*/
    const chooseFile=(e)=>{
        inputFileRef.current.click();
    }
    /*---------------End-------------*/

    /*----------Hide success or failed message after save or edit item----------*/
    window.history.replaceState({},'');
    setTimeout(()=>{
        setLocationState(null);
    },3000);
    /*-------------End----------------*/

    useEffect(()=>{
        fetchItemList(current_page);
        if(chooseMultipleFile.length>0)
        {
            uploadMultipleFiles();
        }
    },[current_page,chooseMultipleFile])
    
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
                    <div className="table-responsive">
                    <table  className="table table-bordered table-striped">
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
                                    <td>
                                        {(val.item_image!=="") &&
                                            val.item_image.map((imgList,index)=>{
                                                if(index<=1)
                                                {
                                                    return <img  height="50px" key={imgList._id} src={ FILE_URL+'uploads/'+ imgList.image } onClick={()=>{showItemDetails(val._id)}} />
                                                }
                                             })
                                        }
                                        {(val.item_image.length>2) &&  <span className="imageCount"  onClick={()=>{showItemDetails(val._id)}} >+{val.item_image.length-2}</span>}
                                    </td>
                                    <td align="center"><Link size="sm" title="View"  onClick={()=>{showItemDetails(val._id)}}><i className="fa fa-eye"></i></Link></td>
                                    <td align="center"><Link size="sm" title="Edit" to={`/admin/master/item/edit/${val._id}`} ><i className="fa fa-edit"></i></Link></td>
                                    <td align="center">
                                    <Link size="sm"  title="Delete"  onClick={()=>{deleteItems(val._id,i)}} ><i className="fa fa-trash-alt"></i></Link></td>
                                </tr>
                            }): <tr key={i}><td colSpan={6} align="center">No Record Found!</td></tr> }
                        </tbody>
                    </table>
                    </div>
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
              { showLoader &&  <Row ><Col lg="12" className="text-center">
                    <i className="fa fa-spinner fa-spin" style={loaderStyle}></i>
                    <div>Please wait....</div>
                </Col></Row> }
               { showContentDetails &&
                <Row> <Col lg="12">
                    <table className="table table-bordered table-striped">
                        <tbody>
                        <tr>
                            <td width="15%">Item Name</td>
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
                            <th colSpan={2}>
                            <Row>
                                <Col xs={2} >
                                    <div className="pull-left" >Images</div> 
                                </Col>
                                <Col xs={5} >
                                {imgUploadStatus.status &&
                                    <Alert variant={imgUploadStatus.type} className="imgUploadStatus">{imgUploadStatus.msg}</Alert>
                                }
                                </Col>
                                
                                <Col xs={5} >
                                    <form type="post" >
                                    <div style={{'textAlign': 'end'}}>
                                        <Button className="btn btn-success btn-sm" onClick={ chooseFile } >{ uploadBtnText }</Button>
                                        <input type="file" max={5} multiple ref={inputFileRef} onChange={handleFileUpload} style={{display: 'none'}} name="item_images[]" id="item_image_input_field" />
                                    </div>
                                    </form>
                                </Col>
                            </Row>
                            </th>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                            { (itemDetailsModal.item_image && itemDetailsModal.item_image.length>0) &&  itemDetailsModal.item_image.map((imgList,index)=>{
                                return <div key={index} className="image-container" style={{float:"left",border:'1px solid #93b0f1a8',padding:'3px',margin:'2px'} }><div><img className="item-image"   height="100px" src={ FILE_URL+'uploads/'+ imgList.image }  /></div><div title="Remove Image" className="remove-button" onClick={()=>{removeImage(itemDetailsModal._id,imgList._id)}}>X</div></div>
                            }) }
                            </td>
                        </tr>
                        
                        </tbody>
                    </table>
                    </Col>
                    </Row>
                }
            </Modal.Body>
        </Modal>
        </div>
        </div>
    )
}

export default ViewItems;