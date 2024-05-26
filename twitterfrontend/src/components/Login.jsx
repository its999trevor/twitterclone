// // import React from 'react'
import { useState } from "react";
import api from "./api";
// import axios from "axios";
// import { USER_API_END_POINT } from "../utils/constant";
// import toast from "react-hot-toast";
// import {useNavigate} from "react-router-dom";
// import {useDispatch} from "react-redux";
// import { getUser } from '../redux/userSlice';
import { redirect, useNavigate} from 'react-router-dom';

const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [fullname,setFullName]=useState("");
    const [id,setId]=useState("");
    const navigate = useNavigate(); 

    const [isLogin, setIsLogin] = useState(true);
    const loginSignupHandler = () => {
        setIsLogin(!isLogin);
    }
    async function submitHandler(e){
        e.preventDefault();
        if(!isLogin){
          try{
            const response=await api.post('/user/',{id,fullname,email,password});
            console.log(response);
            if(response.status==200){

              navigate("/")
            }
          }catch(err){
            console.log(err)
          }
        }else{
          try{
            const response=await api.post('/login/',{email,password});
            console.log(response.data);
            if(response.status==200){
               navigate("/")

            }

          }catch(err){
            console.log(err);
          }
        }


    }
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className='flex items-center justify-evenly w-[80%]'>
        <div>
          <img className='ml-5' width={"200px"} src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png" alt="twitter-logo" />
        </div>
        <div>
          <div className='my-5'>
            <h1 className='font-bold text-5xl'>Happening now.</h1>
          </div>
          <h1 className='mt-4 mb-2 text-2xl font-bold'>{isLogin ? "Login" : "SignUp"}</h1>
          <form onSubmit={submitHandler} className='flex flex-col w-[65%]'>
          {
              !isLogin && (<>
                <input type="text" onChange={(e)=>{setFullName(e.target.value)}} placeholder='Name' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
                <input type="text" onChange={(e)=>{setId(e.target.value)}} placeholder='Username' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
              </>)
            }
            <input onChange={(e)=>{setEmail(e.target.value)}} type="email"  placeholder='Email' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
            <input onChange={(e)=>{setPassword(e.target.value)}} type="password"  placeholder='Password' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
            <button type="submit" className='bg-[#1D9BF0] border-none py-2 my-4 rounded-full text-lg text-white'>{isLogin ? "Login" : "Create Account"}</button>
            <h1>{isLogin ? "Do not have an account?" : "Already have an account?"} <span onClick={loginSignupHandler} className='font-bold text-blue-600 cursor-pointer'>{isLogin ? "SignUp" : "Login"}</span></h1>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
