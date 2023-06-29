export const LOGIN="LOGIN";
export const LOGOUT="LOGOUT";
export const API_URL="http://localhost:5000/api/";

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