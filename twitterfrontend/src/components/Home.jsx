// import React from 'react'
import { useEffect } from 'react';
import LeftSidebar from '../components/LeftSidebar'
// import Feed from '../components/Feed'
import RightSidebar from '../components/RightSidebar'
import {Outlet, useNavigate} from 'react-router-dom';
import { useCookies } from "react-cookie";

const Home = () => {
  const navigate = useNavigate(); 
  const [cookies, removeCookie] = useCookies(['']);
  useEffect(()=>{

    if(!cookies.AUTH_TOKEN){
          navigate("/login");   
    }
  })
  return (
    <div className='flex justify-between w-[80%] mx-auto'>
      <LeftSidebar />
      <Outlet />
      <RightSidebar />
    </div>
  )
}

export default Home
