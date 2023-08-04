import axios from "axios";
import { useNavigate } from 'react-router-dom';
export const LOGIN="LOGIN";
export const LOGOUT="LOGOUT";
export const API_URL="http://localhost:5000/api/";
export const FILE_URL="http://localhost:5000/";
export const PAGE_LIMIT=10;




export const setLoginDetails=async(updateLoginDetails,data)=>{
   await updateLoginDetails(data);
}


export const getLocalStorageData=()=>{
   try{
      const localStorageData=localStorage.getItem('user');
      return JSON.parse(localStorageData);
   }catch(e)
   {
      console.log(e.message);
   }
}

export const getTokenRenewTime=()=>{
   const currentTime = new Date();
   const minutesToAdd = 10;
   return new Date(currentTime.getTime() + minutesToAdd * 60000);
}


export const verifyAccessToken=async()=>{

   if(localStorage.getItem('user')){
      const userSessionData=localStorage.getItem('user');
      const userData=JSON.parse(userSessionData);
      let currentTime=new Date();
      let accessTokenTime=new Date(userData.accessTokenRenewTime)
      
      if(accessTokenTime<=currentTime)
      {
         await axios.post(API_URL+"verifytoken",{"accessToken":userData.accessToken})
         .then((result)=>{
         
            if(result.data.status==200)
            {
               let tokenRenewTime=getTokenRenewTime();
               userData.accessTokenRenewTime=tokenRenewTime;
               userData.accessToken=result.data.accessToken;
               localStorage.setItem('user',JSON.stringify(userData));
            }else{
               localStorage.removeItem('user');
            }  
         })
         .catch((err)=>{
            console.log(err.message);
         })
      }
   }
}

export const useRedirect=()=>{
   
   const redirectUrl=useNavigate();
   const handleRedirect=(url)=>{
      redirectUrl(url);
   }
   return {
      handleRedirect
   }
}