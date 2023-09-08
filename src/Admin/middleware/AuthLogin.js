import React from "react";
import { Navigate } from "react-router-dom";

export default ({children})=>{

    try{
        const userLoginDetails=JSON.parse(localStorage.getItem("user"));
        if(Object.keys(userLoginDetails).length>0)
        {
            return <Navigate to="/admin/login" replace />
        }else{
            return children;
        }

    }catch(e){
        return children;

    }
    

    
}