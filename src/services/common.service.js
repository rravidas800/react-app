import axios from "axios";
import {API_URL} from '../action/common';

export const saveCategory=async(parmas)=>{
    try{
       return axios.post(API_URL+"category/add",parmas)
       .then((result)=>{
           if(result.data.status==='success')
           {
                return true;
           }else{
                return false;
           }
       })
       .catch(err=>{
        return false;
       })
    }
    catch(e){
        return false;
    }
}

export const getAllCategory=async(parmas)=>{
    try{
       return await axios.post(API_URL+"category/view",parmas)
       .then((result)=>{
           if(result.data.status==='success')
           {
                return result.data;
           }else{
                return false;
           }
       })
       .catch(err=>{
            return false;
       })
    }
    catch(e){
        return false;
    }
}