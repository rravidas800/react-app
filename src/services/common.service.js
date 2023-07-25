import axios from "axios";
import {API_URL} from '../action/common';

export const saveCategory=async(parmas)=>{
    try{
       return axios.post(API_URL+"category/add",parmas)
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

export const deleteCategoryById=async(params)=>{
    try{
        return await axios.post(API_URL+"category/delete",params)
        .then(result=>{
            if(result.data.status=='success')
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
    catch(e)
    {
        return false;
    }
}

export const saveItemData=async(params)=>{
    console.log("form data=>",params);
    try{
        const config = {     
            headers: { 'Content-type': 'multipart/form-data' }
        }
        return await axios.post(API_URL+"item/save",params)
        .then(result=>{
            console.log(result);
        })
        .catch(err=>{
            console.log(err);
        })
    }catch(e)
    {
        return false;
    }
}
