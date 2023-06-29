import React from "react";
import { Navigate } from "react-router-dom";

export default ({children})=>{

    try{
        const userLoginDetails=JSON.parse(localStorage.getItem("user"));
        if(userLoginDetails._id.length>0)
        {
            return <Navigate to="/admin" replace />
        }else{
            return children;
        }

    }catch(e){
        return children;

    }
    

    
}