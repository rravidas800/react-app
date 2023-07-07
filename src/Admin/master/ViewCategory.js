import React, { useEffect, useState } from "react";
import { Alert, Col, Nav, Row } from "react-bootstrap";
import { getLocalStorageData, useRedirect, PAGE_LIMIT } from "../../action/common";
import { Link, useLocation } from "react-router-dom";
import { getAllCategory } from "../../services/common.service";
import { Pagination } from "react-bootstrap";

const ViewCategory=()=>{
    const { state  }=useLocation();
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
    
    useEffect(()=>{
        fetchCategoryList(current_page);
    },[current_page])
    
    let pageNo=(parseInt(current_page)*parseInt(PAGE_LIMIT))-parseInt(PAGE_LIMIT);
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
        { (state && state.status.length>0) && <Alert variant="success">Record Submitted Successfully</Alert> }
            <Row className="justify-content-md-center">
                <Col lg="12">
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Sl No.</td>
                                <td>Category</td>
                                <td align="center" colSpan={2}>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                        { categoryList.length>0  ? categoryList.map(val=>{
                              return  <tr key={i}>
                                    <td>{++i}</td>
                                    <td>{val.category}</td>
                                    <td align="center"><Link to="">Edit</Link></td>
                                    <td align="center"><Link to="">Delete</Link></td>
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