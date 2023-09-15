import React, { useEffect, useState } from "react";
import { Alert, Col, Nav, Row } from "react-bootstrap";
import { getLocalStorageData, useRedirect, PAGE_LIMIT,FILE_URL } from "../../action/common";
import { Link, useLocation } from "react-router-dom";
import { getAllBanner,deleteCategoryById } from "../../services/common.service";
import { Pagination } from "react-bootstrap";
import Utils from "../includes/utils";  


const ViewBanner=()=>{
    const { state  }=useLocation();
    const [locationState,setLocationState]=useState(state);
    let { handleRedirect } =useRedirect();
    const [bannerList,setBannerList]=useState([])
    const [current_page,setCurrentPage]=useState(1);
    const [totalPages,setTotalPages]=useState(0);

    const fetchBannerList=async(current_page)=>{
        let parmas={
            pageNumber:current_page,
            limit:PAGE_LIMIT
        }
        try{
            await getAllBanner(parmas).then(result=>{
                if(result)
                {
                    setBannerList(result.result);
                    setTotalPages(result.total_page);
                 
                }else{
                    setBannerList([]);
                }
             })
             .catch(err=>{
                setBannerList([]);
             })
        }catch(err){
            setBannerList([]);
        }
    }


    const deleteBanner=(bid,slno )=>{
        console.log(bid,slno);
    }
    
    const handlePageClick = (pageNumber) => {
      if(pageNumber>0 && pageNumber<=totalPages){  setCurrentPage(pageNumber); }  
    };

    window.history.replaceState({},'');
    setTimeout(()=>{
        setLocationState(null);
    },3000);

    useEffect(()=>{
        fetchBannerList(current_page);
    },[current_page])
    
    const pageNo=(parseInt(current_page)*parseInt(PAGE_LIMIT))-parseInt(PAGE_LIMIT);
    let i=pageNo;

    return (<>
                <div>
                    
                    <Nav variant="tabs" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link   onClick={()=>{ handleRedirect("/admin/master/banner") }} >Manage Banner</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link active onClick={()=>{ handleRedirect("/admin/master/banner/view") }}>View Banner</Nav.Link>
                        </Nav.Item>
                       
                    </Nav>
                    <Utils/>    
                    <div className="p-5">
                    { (locationState && locationState.status.length>0) && <Alert variant="success" dismissible>{ locationState.message } </Alert> }
                        <Row className="justify-content-md-center">
                            <Col lg="12">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Sl No.</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Link</th>
                                            <th>Image</th>
                                            <th className="text-center" colSpan={2}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { bannerList ? bannerList.map(val=>{
                                        return  <tr key={i}>
                                                <td>{++i}</td>
                                                <td>{val.title}</td>
                                                <td>{val.description}</td>
                                                <td>{val.banner_link}</td>
                                                <td><img  height="50px" src={ FILE_URL+'uploads/'+ val.banner_image } alt="" /></td>
                                                <td align="center"><Link size="sm" title="Edit" to={`/admin/master/banner/edit/${val._id}`} ><i className="fa fa-edit"></i></Link></td>
                                                <td align="center">
                                                <Link size="sm" title="Delete" onClick={()=>{deleteBanner(val._id,i)}} ><i className="fa fa-trash-alt"></i></Link></td>
                                            </tr>
                                        }): <tr key={i}><td colSpan={7} align="center">No Record Found!</td></tr> }
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
                </div>
            </>)
}

export default ViewBanner