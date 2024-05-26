// import React from 'react'
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
// import { Link } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";
import api from "./api";

const RightSidebar = () => {
  const [data,setData]=useState([])
  useEffect(()=>{
      getProfiles();
  },[])
 async function getProfiles(){
      let response=await api.get("/user/allprofiles");
      // console.log(response.data.users);
      setData(response.data.users);
  }
  return (
    <div className='w-[27%]'>
      <div className='flex items-center p-2 bg-gray-100 rounded-full outline-none w-full'>
        <CiSearch size="20px" />
        <input type="text" className='bg-transparent outline-none px-2' placeholder='Search' />
      </div>
      <div className='p-4 bg-gray-100 rounded-2xl my-4'>
        <h1 className='font-bold text-lg'>Who to follow</h1>
              {data.map((user,index)=>
          <div key={index} className='flex items-center justify-between my-3'>
            <div className='flex' >
              <div>
                <Avatar src={user?user.pfp:"https://i.pinimg.com/564x/92/5c/bb/925cbb0d8ecf1a5a64f36ffe91694029.jpg"} size="40" round={true} />
              </div>
                
                <div className='ml-2' >
                    <h1 className='font-bold'>{user.fullname}</h1>
                    <p className='text-sm'>{user.id}</p>
            </div>
                
            </div>
            <div>
            <button className='px-4 py-1 bg-black text-white rounded-full'>Profile</button>
            </div>
          </div>
          )}
      </div>
    </div>
  )
}

export default RightSidebar
