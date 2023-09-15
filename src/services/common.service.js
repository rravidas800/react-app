import axios from "axios";
import {API_URL, getLocalStorageData} from '../action/common';



export const saveCategory=async(parmas)=>{
    try{
        let localStorageData=getLocalStorageData();
        const config = {     
            headers: { 'authorization': localStorageData?localStorageData.accessToken:"" }
        }

       return axios.post(API_URL+"category/add",parmas,config)
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
        let localStorageData=getLocalStorageData();
        const config = {     
            headers: { 'authorization': localStorageData?localStorageData.accessToken:"" }
        }
       return await axios.post(API_URL+"category/view",parmas,config)
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
    catch(e)
    {
        return false;
    }
}

export const saveItemData=async(params)=>{
    try{
        let localStorageData=getLocalStorageData();
        const config = {     
            headers: { 'authorization': localStorageData.accessToken }
        }
        return await axios.post(API_URL+"item/save",params,config)
        .then(result=>{
            return result.data
        })
        .catch(err=>{
            return false
        })
    }catch(e)
    {
        return false;
    }
}


export const getAllItems=async(params)=>{
    try{
        let localStorageData=getLocalStorageData();
        const config = {     
            headers: { 'authorization': localStorageData.accessToken }
        }
        
        return await axios.post(API_URL+"item/view",params,config)
        .then(result=>{
            
            if(result)
            {
                return result.data;
            }else{
                return false;        
            }
           
            
        })
        .catch(err=>{
            console.log("error=>",+err);
            return false;
        })
    }catch(e)
    {
        return false;
    }
}

export const deleteItemById=async(params)=>{
    try{
        let localStorageData=getLocalStorageData();
        const config = {     
            headers: { 'authorization': localStorageData.accessToken }
        }
        return await axios.post(API_URL+"item/delete",params,config)
        .then(result=>{
            if(result.data.status=='success'){ 
                return true;
            }
            else{
                return true;
            }
        })
        .catch(err=>{
            return false;
        })
    }catch(e)
    {
        return false;
    }
}


export const uploadMultipleImages=async(formdata)=>{
    try{
        let localStorageData=getLocalStorageData();
        const config={
            headers: { 'authorization': localStorageData.accessToken }
        }
        return axios.post(API_URL+"upload-item-images",formdata,config)
        .then(result=>{
            return result.data;
        })
        .catch(err=>{
            return false
        })

    }catch(e){
        return false
    }
}

export const removeItemImage=(params)=>{
    try{
        let localStorage=getLocalStorageData();
        const config={
            headers:{'authorization':localStorage.accessToken}
        }
        return axios.post(API_URL+"item/remove-image",params,config)
        .then(result=>{
            if(result.data.status=='success')
            {
                return true;
            }else{
                return false;
            }
        })  
        .catch(err=>{
            return false;
        })      
    }catch(e){
        return false;
    }

}

export const saveBannerForm=async(formData)=>{
    let localStorage=getLocalStorageData();
    const config={
        headers:{'authorization':localStorage.accessToken}
    }
    return await axios.post(API_URL+"banner/save",formData,config)
    .then(result=>{
       return result.data;
    })
    .catch(err=>{
        return false;
    })
}

export const getAllBanner=async(params)=>{
   let localStorage=getLocalStorageData();
    const config={
        headers:{'authorization':localStorage.accessToken}
    }
    return await axios.post(API_URL+"banner/view",params,config)
    .then(result=>{
       return result.data
    })
    .catch(err=>{
        return false;
    })
}