import axios from "axios";

import { API_URL } from "../action/common";


export const UserLogin=async(params)=>{
   
    try{  
        return axios.post(API_URL+"login",params)
        .then((result)=>{
            if(result.data.accessToken){
                localStorage.setItem("user",JSON.stringify(result.data));    
            }
            return result.data;
        })
        .catch(err=>{
            return err;
        })
    }catch(e){
        console.log(e.message);
    }
}


 export const Logout=()=>{
        localStorage.removeItem("user");       
    }

