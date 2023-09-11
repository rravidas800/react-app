import React from "react";
import Header from "../website/includes/Header";
import Footer from "../website/includes/Footer";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";



const Website=()=>{
    
    return (
        <>  
            <Header />               
                    <Outlet/>
            <Footer/>
        </>
    )
}

export default Website;