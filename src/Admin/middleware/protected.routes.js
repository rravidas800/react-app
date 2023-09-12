import React,{useState,useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
 import { getTokenRenewTime } from "../../action/common";
 export const API_URL="http://localhost:5000/api/";


export default ({children,history})=>{
    
    const userSessionData=localStorage.getItem('user');
    const navigate = useNavigate();
    const [isTokenValid, setIsTokenValid] = useState(true);

    const verifyAccessToken=async()=>{

        if(localStorage.getItem('user')){
           const userSessionData=localStorage.getItem('user');
           const userData=JSON.parse(userSessionData);
           let currentTime=new Date();
           let accessTokenTime=new Date(userData.accessTokenRenewTime)
           let currentTimeAfterFiveMinute=new Date(currentTime.getTime() + 4 * 60000);
           console.log(accessTokenTime,"==",currentTime,"==",currentTimeAfterFiveMinute);
           if(accessTokenTime<currentTimeAfterFiveMinute)
           {                 
              await axios.post(API_URL+"verifytoken",{"accessToken":userData.accessToken})
              .then((result)=>{
              
                 if(result.data.status==200)
                 {
                    console.log("renew token");
                    let tokenRenewTime=getTokenRenewTime();
                    userData.accessTokenRenewTime=tokenRenewTime;
                    userData.accessToken=result.data.accessToken;
                    localStorage.setItem('user',JSON.stringify(userData));
                    setIsTokenValid(true);
                 }else{
                    console.log(result.data);
                    localStorage.removeItem('user');
                    setIsTokenValid(false);
                 }  
              })
              .catch((err)=>{
                 localStorage.removeItem('user');
                 console.log(err.message);
                 setIsTokenValid(false);
              })
           }else{
              console.log("loged in");
              setIsTokenValid(true);
           }
        }
     }
    
    useEffect(() => {
        verifyAccessToken();
        if (!isTokenValid) {
            console.log("invalid token"); 
            navigate('/admin/login');
          
        }
    }, [children,isTokenValid]);
    
    try
    {
       
        const userData=JSON.parse(userSessionData);
       
        if(Object.keys(userData).length>0)
        {
            return children;
        }else{
            return <Navigate to="/admin/login" replace />
        }

    } 
    catch(e)
    {
        return <Navigate to="/admin/login" replace />
    }
}