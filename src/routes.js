import Dashboard from "./Admin/Dashboard";
import Login from "./Admin/Login"
import Category from "./Admin/master/Category";
import ViewCategory from "./Admin/master/ViewCategory";
import AuthLogin from "./Admin/middleware/AuthLogin";
import Items from "./Admin/master/Items";
import ProtectedRoutes from "./Admin/middleware/protected.routes"
import { AppProvider } from './contaxts/AppContaxt';
import Admin from "./layouts/Admin";
import PageNotFound from "./layouts/PageNotFound"
import { useRoutes } from 'react-router-dom';
import ViewItems from "./Admin/master/ViewItems";
import Website from "./layouts/Website";
import Homepage from "./website/Homepage";
import Banner from "./Admin/master/Banner";
import ViewBanner from "./Admin/master/ViewBanner";

export const AppRoutes =()=>{
    const routes=useRoutes([
    {
      path:"/",
      element:<Website/>,
      children:[
        {
          path:"/",
          element:<Homepage/>
        }
      ]
    },
    {
      path:"/admin/login",
      element:<AuthLogin><Login/></AuthLogin>
    },
    {
        path:"/admin",
        element:<ProtectedRoutes><Admin/></ProtectedRoutes>,
        children:[
          {
            path:"dashboard",
            element:<ProtectedRoutes><Dashboard/></ProtectedRoutes>,
          },
          {
              path:"master",
              element:'',
              children:[
                        {
                          path:"banner",
                          element:<ProtectedRoutes><Banner/></ProtectedRoutes>
                        },
                        {
                          path:"banner/edit/:id",
                          element:<ProtectedRoutes><Banner/></ProtectedRoutes>
                        },
                        {
                          path:"banner/view",
                          element:<ProtectedRoutes><ViewBanner/></ProtectedRoutes>
                        },
                        {
                          path:"category",
                          element:<ProtectedRoutes><Category/></ProtectedRoutes>
                        },
                        {
                          path:"category/view",
                          element:<ProtectedRoutes><ViewCategory/></ProtectedRoutes>
                        },
                        {
                            path:"category/edit/:id",
                            element:<ProtectedRoutes><Category/></ProtectedRoutes>
                        },
                        {
                          path:"item",
                          element:<ProtectedRoutes><Items/></ProtectedRoutes>
                        },
                        {
                          path:"item/edit/:id",
                          element:<ProtectedRoutes><Items/></ProtectedRoutes>
                        },
                        {
                          path:"item/view",
                          element:<ProtectedRoutes><ViewItems/></ProtectedRoutes>
                        }
                  ]
          }
        ]
        
    },
    {
        path:"*",
        element:<PageNotFound/>
    }
  ])

   return (<AppProvider>{routes}</AppProvider>)
}