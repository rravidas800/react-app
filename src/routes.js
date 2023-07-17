import Dashboard from "./Admin/Dashboard";
import Login from "./Admin/Login"
import Category from "./Admin/master/Category";
import ViewCategory from "./Admin/master/ViewCategory";
import AuthLogin from "./Admin/middleware/AuthLogin"
import ProtectedRoutes from "./Admin/middleware/protected.routes"
import { AppProvider } from './contaxts/AppContaxt';
import Admin from "./layouts/Admin";
import PageNotFound from "./layouts/PageNotFound"
import { useRoutes } from 'react-router-dom';

export const AppRoutes =()=>{
    const routes=useRoutes([
    {
      path:"/",
      element:<AuthLogin><Login/></AuthLogin>
    },
    {
      path:"/login",
      element:<AuthLogin><Login/></AuthLogin>
    },
    {
        path:"/admin",
        element:<ProtectedRoutes><Admin/></ProtectedRoutes>,
        children:[{
            path:"dashboard",
            element:<ProtectedRoutes><Dashboard/></ProtectedRoutes>,
        },
        {
            path:"master",
            element:'',
            children:[{
                path:"category",
                element:<ProtectedRoutes><Category/></ProtectedRoutes>
                },{
                  path:"category/view",
                  element:<ProtectedRoutes><ViewCategory/></ProtectedRoutes>
                  },
                  {
                    path:"category/edit/:id",
                    element:<ProtectedRoutes><ViewCategory/></ProtectedRoutes>
                  }
                ]
        }]
        
    },
    {
        path:"*",
        element:<PageNotFound/>
    }
  ])

   return (<AppProvider>{routes}</AppProvider>)
}