import React from "react";
import Header from "../Admin/includes/Header";
import Sidebar from "../Admin/includes/Sidebar";
import Footer from "../Admin/includes/Footer";

import { Logout } from "../services/auth.service";
import { getLocalStorageData } from "../action/common";
import { Outlet } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

const Admin =()=>{
   
    return (<><Header userDetails={getLocalStorageData()} logout={Logout}  />
                <Container>
                    <Row className="mt-5">
                    <Outlet/>
                    </Row>
                </Container>
             <Footer/>
            </>);
}

export default Admin;


