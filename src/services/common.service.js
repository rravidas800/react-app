import axios from "axios";
import {API_URL} from '../action/common';

export const saveCategory=async(parmas)=>{
    try{
       return axios.post(API_URL+"category",parmas)
       .then((result)=>{
            console.log(result);
       })
    }
    catch(e){

    }
}