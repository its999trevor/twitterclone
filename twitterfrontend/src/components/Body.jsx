// import React from 'react'
import Home from '../components/Home'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Feed from './Feed';
import Profile from './Profile';
import Login from './Login'
import Tweetbyid from './Tweetbyid';
const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      children:[
          {
              path:"/",
              element:<Feed/>
          },
          {
              path:"/profile",
              element:<Profile/>
          },
          {
            path:"/:userid/status/:tweetid",
            element:<Tweetbyid/>
          }
      ]
  },
    {
      path: "/login",
      element: <Login/>,
      
    }
])
return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
)
}

export default Body
