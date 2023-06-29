import axios from "axios";
import {APP_URL} from '../action/common';

export const saveCategory=async(parmas)=>{
    try{
       return axios.post(APP_URL+"saveCategory",parmas)
       .then((result)=>{
        
       })
    }
    catch(e){

    }
}