
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppRoutes } from './routes';
import { verifyAccessToken } from './action/common'



function App() {
   verifyAccessToken();
   return (<AppRoutes/>);  
}

export default App;
