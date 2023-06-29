import React from "react";
import { Navigate } from "react-router-dom";

export default ({children})=>{

    const userSessionData=localStorage.getItem('user');
    
    try
    {
        const userData=JSON.parse(userSessionData);
       
        if(userData._id.length>0)
        {
            return children;
        }else{
            return <Navigate to="/login" replace />
        }

    } 
    catch(e)
    {
        return <Navigate to="/login" replace />
    }
}