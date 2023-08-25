import React, { useEffect, useState } from "react";
import { Alert, Col, Nav, Row } from "react-bootstrap";
import { getLocalStorageData, useRedirect, PAGE_LIMIT,FILE_URL } from "../../action/common";
import { Link, useLocation } from "react-router-dom";
import { getAllCategory,deleteCategoryById } from "../../services/common.service";
import { Pagination } from "react-bootstrap";

const ViewCategory=()=>{
    const { state  }=useLocation();
    const [locationState,setLocationState]=useState(state);
    let { handleRedirect } =useRedirect();
    const [categoryList,setCategoryList]=useState([])
    const [current_page,setCurrentPage]=useState(1);
    const [totalPages,setTotalPages]=useState(0);
    

    let localStorageData=getLocalStorageData();

    const fetchCategoryList=async(current_page)=>{
        let parmas={
            accessToken:localStorageData.accessToken,
            pageNumber:current_page,
            limit:PAGE_LIMIT
        }
        try{
            await getAllCategory(parmas).then(result=>{
                if(result)
                {
                    setCategoryList(result.result);
                    setTotalPages(result.total_page);
                 
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
    
    const handlePageClick = (pageNumber) => {
      if(pageNumber>0 && pageNumber<=totalPages){  setCurrentPage(pageNumber); }  
    };


    const deleteCategory=(id,slNo)=>{
        const deleteParams={
            "_id":id,
            accessToken:localStorageData.accessToken
        }
        deleteCategoryById(deleteParams).
        then(result=>{
            if(result)
            {
                if((pageNo+1)==slNo)
                {
                    setCurrentPage(current_page-1);   
                }else{
                    fetchCategoryList(current_page); 
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
        fetchCategoryList(current_page);
    },[current_page])
    
    const pageNo=(parseInt(current_page)*parseInt(PAGE_LIMIT))-parseInt(PAGE_LIMIT);
    let i=pageNo;
    return (<div>
        <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link   onClick={()=>{ handleRedirect("/admin/master/category") }} >Manage Category</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link active onClick={()=>{ handleRedirect("/admin/master/category/view") }}>View Category</Nav.Link>
            </Nav.Item>
        </Nav>
        <div className="p-5">
        { (locationState && locationState.status.length>0) && <Alert variant="success" dismissible>{ locationState.msg } </Alert> }
            <Row className="justify-content-md-center">
                <Col lg="12">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Sl No.</th>
                                <th>Category</th>
                                <th>Image</th>
                                <th className="text-center" colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        { categoryList.length>0  ? categoryList.map(val=>{
                              return  <tr key={i}>
                                    <td>{++i}</td>
                                    <td>{val.category}</td>
                                    <td><img  height="50px" src={ FILE_URL+'uploads/'+ val.image } alt="" /></td>
                                    <td align="center"><Link size="sm" title="Edit" to={`/admin/master/category/edit/${val._id}`} ><i className="fa fa-edit"></i></Link></td>
                                    <td align="center">
                                    <Link size="sm" title="Delete" onClick={()=>{deleteCategory(val._id,i)}} ><i className="fa fa-trash-alt"></i></Link></td>
                                </tr>
                            }): <tr key={i}><td colSpan={4} align="center">No Record Found!</td></tr> }
                        </tbody>
                    </table>
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
                 </Col>
            </Row>
        </div>
    </div>)
}

export default ViewCategory;