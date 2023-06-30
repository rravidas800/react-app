
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppRoutes } from './routes';
import axios from 'axios';
import { API_URL } from './action/common';

const verifyAccessToken=async()=>{

   if(localStorage.getItem('user')){
      const userSessionData=localStorage.getItem('user');
      const userData=JSON.parse(userSessionData);

      await axios.post(API_URL+"verifytoken",{"accessToken":userData.accessToken})
      .then((result)=>{
      
         if(result.data.status==200)
         {
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

function App() {
   verifyAccessToken();
   return (<AppRoutes/>);
}

export default App;
