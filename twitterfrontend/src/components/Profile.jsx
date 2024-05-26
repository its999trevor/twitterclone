// import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import Avatar from "react-avatar";
import api from "./api";
import { useState } from "react";
import { useEffect } from "react";
import Tweet from "./Tweet";
import EditProfileModal from "./EditProfileModal";
// import { useSelector,useDispatch } from "react-redux";
// import useGetProfile from '../hooks/useGetProfile';
// import axios from "axios";
// import { USER_API_END_POINT } from '../utils/constant';
// import toast from "react-hot-toast"
// import { followingUpdate } from '../redux/userSlice';
// import { getRefresh } from '../redux/tweetSlice';
const Profile = () => {
    const [data,setData]=useState([]);
    const [profiledata,setProfileData]=useState({})
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    useEffect(()=>{
        getData();
    },[data,profiledata])
    async function getData(){
        let response=await api.get("/user/profile");
        let res=await api.get("/user/currentuser");
        setData(response.data)
        setProfileData(res.data.user)
        // console.log(res.data)
    }
    
    const handleEditProfile = (updatedProfile) => {
        setProfileData(updatedProfile);
        setIsEditProfileOpen(false);
    };
  return (
    <div className='w-[50%] border-l border-r border-gray-200'>
            <div>
                <div className='flex items-center py-2'>
                    <Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
                        <IoMdArrowBack size="24px" />
                    </Link>
                    <div className='ml-2'>
                        <h1 className='font-bold text-lg'>{profiledata.fullname}</h1>
                        <p className='text-gray-500 text-sm'>{data.length}</p>
                    </div>
                </div>
                <img style={{width:'100%',height:"180px"}} src={profiledata?profiledata.cover:""} alt="banner" />
                <div className='absolute top-52 ml-2 border-4 border-white rounded-full'>
                    <Avatar src={profiledata?profiledata.pfp:"https://i.pinimg.com/564x/92/5c/bb/925cbb0d8ecf1a5a64f36ffe91694029.jpg"} size="85" round={true} />
                </div>
                <div className='text-right m-4'>
                <button  onClick={() => setIsEditProfileOpen(true)} className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>Edit Profile</button>
                </div>
                <div className='m-4'>
                    <h1 className='font-bold text-xl'>{profiledata.fullname}</h1>
                    <p>@{profiledata.id}</p>
                </div>
                <div className='m-4 text-sm'>
                    <p>{profiledata.bio}</p>
                </div>
            </div>

            {data.map((tweet,idx) => (
      <div key={idx}>
      <Tweet tweet={tweet} />
      </div>
      
    ))} 


{isEditProfileOpen && (
                <EditProfileModal
                    profileData={profiledata}
                    onClose={() => setIsEditProfileOpen(false)}
                    onSave={handleEditProfile}
                />
            )}

        </div>
  )
}

export default Profile
