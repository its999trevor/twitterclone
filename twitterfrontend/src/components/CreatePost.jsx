import React, { useState } from 'react';
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import { MdClose } from 'react-icons/md';
import api from "./api";
import toast, { Toaster } from "react-hot-toast";

import Handlers from './Handlers';
import { useEffect } from 'react';

const CreatePost = () => {
    const [content, setContent] = useState("");
    const [fileData, setFileData] = useState(null);
    const [fileType, setFileType] = useState('');
     async function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFileData(reader.result);
                
                // console.log(reader.result);
                setFileType(file.type);
                // console.log(file.type);
            };
            reader.readAsDataURL(file);
        }
    }
    const handleDelete = () => {
        setFileData(null);
        setFileType('');
    };

    const [user,setUser]=useState({});
    useEffect(()=>{
        async function getData(){
           const res=await api.get("user/currentuser");
            console.log(res.data.user);
            setUser(res.data.user);
        }
        getData()
    },[])

    async function post(e) {
        e.preventDefault();
        try{
            console.log(e);
        const formData = new FormData();
        formData.append('content', content); 
       
            formData.append('file', fileData); 
            formData.append('filetype', fileType); 
    
            // console.log(fileData,"  filedat");
      
        console.log([...formData]);
        const config = {
            headers: {
              'content-type': 'multipart/form-data',
            },
          };
        


        const response = await api.post("/tweet/", formData, config );
        console.log(response);

        setContent(""); // Reset content
        handleDelete();
        toast.success("Your post was sent.");
    } catch (err) { 
        console.error(err);
        toast.error("Failed to send the post.");
    }
    }

    return (
        <div className='w-[100%]'>
            <div>
                <form onSubmit={post} encType='multipart/form-data' >

                
                <div className='flex items-center justify-evenly border-b border-gray-200'>
                    <div className='cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3'>
                        <h1 className='font-semibold text-gray-600 text-lg'>For you</h1>
                    </div>
                    <div className='cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3'>
                        <h1 className='font-semibold text-gray-600 text-lg'>Following</h1>
                    </div>
                </div>
                <div>
                    <div className='flex items-center p-4'>
                        <div>
                            <Avatar src={user?user.pfp:"https://i.pinimg.com/564x/92/5c/bb/925cbb0d8ecf1a5a64f36ffe91694029.jpg"} size="40" round={true} />
                        </div>
                        <input
                            value={content} // Bind value to state
                            onChange={(e) => setContent(e.target.value)}
                            className='w-full outline-none border-none text-xl ml-2'
                            type="text"
                            placeholder='What is happening?!'
                        />

                    </div>
                    {fileData && (
                        <div>
                            {fileType.startsWith('image/') ? (
                                <img className='rounded-xl mx-12 my-2' src={fileData} alt="Uploaded" style={{ width: "100%", maxWidth: '85%' }} />
                            ) : fileType.startsWith('video/') ? (
                                <video className='rounded-xl mx-12 my-2' controls loop muted style={{ width: "100%", maxWidth: '85%' }} autoPlay>
                                    <source src={fileData} type={fileType} />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <p>Unsupported file type</p>
                            )}
                            <button
                                onClick={handleDelete}
                                style={{
                                    position: 'absolute',
                                    top: '145px',
                                    right: '750px',
                                    cursor: 'pointer'

                                }}
                            >
                                <MdClose className='rounded-full bg-neutral-700	hover:bg-neutral-400 m-1 p-1 ' style={{ color: 'white', fontSize: '30px' }} />
                            </button>
                            
                        </div>
                    )}
                    <div className='flex items-center justify-between p-4 border-b border-gray-300'>
                        <div>
                            <input name='file' id="file" onChange={handleFileChange} style={{ display: 'none' }} type='file' />
                            <label htmlFor="file"><CiImageOn className='text-blue-500 rounded-full hover:bg-blue-200' size="24px" /></label>
                        </div>
                        <button type='submit'
                            
                            className='bg-[#1D9BF0] px-4 py-1 text-lg text-white text-right border-none rounded-full'>
                            Post
                        </button>

                    </div>
                </div>
                    </form>
            </div>
            <Toaster position="bottom-center" reverseOrder={false} />

        </div>
    );
}

export default CreatePost;
