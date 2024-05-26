import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState, useEffect } from 'react';
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { BiRepost } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { RiShare2Line } from "react-icons/ri";
import dayjs from 'dayjs'
import api from './api';
import Handlers from './Handlers';
import { useNavigate, useParams } from 'react-router-dom';
import { getFileType } from './Tweet';

const Tweetbyid = () => {
    const [tweet, setTweet] = useState([]);
    const fileType = getFileType(tweet.filepath);

    const navigate = useNavigate();
    let { userid, tweetid } = useParams();
    const [date, setDate] = useState();
    const [name, setName] = useState("")
    const [content, setContent] = useState("");
    const [like,setLike]=useState(false)
    const [retweet, setRetweet] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [retweetCount, setRetweetCount] = useState(0);
    useEffect(() => {
        async function checkIfLiked() {
            const response = await Handlers.checkIfLiked(tweetid);
            if (response) {
                setLike(response.isLiked);
            }
        }
        async function checkIfRetweeted() {
            const response = await Handlers.checkIfRetweeted(tweetid);
            if (response) {
                setRetweet(response.isRetweeted);
            }
        }
        checkIfLiked();
        checkIfRetweeted();
        getTweet();
    }, [tweet]);
    async function handleLike(e) {
        e.stopPropagation();
        const response = await Handlers.likehandler(tweet.id);
        if (response === "liked") {
            setLike(true);
            setLikeCount(prevCount => prevCount + 1);
        } else if (response === "disliked") {
            setLike(false);
            setLikeCount(prevCount => prevCount - 1);
        }
    }

    async function handleRetweet(e) {
        e.stopPropagation();
        const response = await Handlers.retweethandler(tweet.id);
        console.log(response)
        if (response && response.undo) {
            setRetweet(false);
            setRetweetCount(prevCount => prevCount - 1);
        } else {
            setRetweet(true);
            setRetweetCount(prevCount => prevCount + 1);
        }
    }
    async function getTweet() {
        const response = await api.get(`/tweet/${tweetid}`);
        setTweet(response.data);
        setDate(response.data.createdat);
        setName(response.data.user)
        setLikeCount(response.data.likecount)
        setRetweetCount(response.data.retweetCount)
        console.log(response.data);
    }
    return (
        <div className='w-[50%] border-x border-gray-200'>

            <div className='flex items-center justify-evenly '>

                <div onClick={() => {
                    navigate("/");
                }} className='cursor-pointer hover:bg-gray-200 rounded-full text-center ml-2 w-10 pl-2 py-2'>
                    <IoMdArrowRoundBack size="20px" />
                </div>
                <div className='cursor-pointer w-full ml-4 py-3'>
                    <h1 className='font-semibold text-black font-semibold	 text-2xl	'>Post</h1>
                </div>
            </div>

            <div className='border-b border-gray-200'>

                <div className='flex py-1'>

                    <div className=' w-full'>
                        <div className='flex items-center ml-2 position:absolute'>
                            <Avatar className='flex items-start mx-1 h-10 w-10 position: relative top-0.5' src={name?name.pfp:"https://i.pinimg.com/564x/92/5c/bb/925cbb0d8ecf1a5a64f36ffe91694029.jpg"} size="40" round={true} />
                            <h1 className='font-bold pl-2  position: relative bottom-1.5'>{name.fullname}</h1>
                            <p className='text-gray-500 text-base position: relative top-3.5 right-10'>@{tweet.userid}</p>
                        </div>

                        <p className='text-lg font-serif mx-4 mt-4	'>{tweet.content}</p>
                        {tweet.filepath && (
                <div style={{ position: 'relative', display: 'inline-block', marginTop: '10px' }}>
                      {fileType === 'image' && (
                <img src={tweet.filepath} alt="Uploaded"  className='rounded-xl mx-12 my-2'  style={{ width: "100%", maxWidth: '85%' }} />
            )}
            {fileType === 'video' && (
                <video className='rounded-xl mx-12 my-2' controls  style={{ width: "100%", maxWidth: '85%' }} autoPlay muted>
                    <source src={tweet.filepath} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
                </div>
            )}

                        <div className='text-base mx-4 text-[#536471] py-2' >{dayjs(date).format('h:mm:A MMM D, YYYY')}</div>
                        <div className='flex justify-around my-3 mx-4 border-y border-inherit border-width: 1px;'>
                            <div className='flex items-center'>
                                <div className='p-2 hover:bg-blue-200 rounded-full cursor-pointer'>
                                    <FaRegComment className='text-[#536471]' size="20px" />
                                </div>
                                <p className='text-[#536471]'>0</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'
                                    onClick={handleRetweet}
                                >
                                    {retweet? <BiRepost className='text-[#00BA7c]' size="24px" /> : <BiRepost className='text-[#536471]' size="20px" />}
                                </div>
                                {retweet ? <p className='text-[#00BA7c]'>{retweetCount}</p> : <p className='text-[#536471]'>{retweetCount}</p>}
                            </div>
                            <div className='flex items-center'>
                                <div
                                    className='p-2 hover:bg-pink-200 rounded-full cursor-pointer'
                                    onClick={handleLike}>
                                    {like? <IoHeartSharp size="24px" className='text-[#f91880]' /> : <IoHeartOutline className='text-[#536471]' size="24px" />}

                                </div>
                                {like? <p className='text-[#f91880]'>{likeCount}</p> : <p className='text-[#536471]'>{likeCount}</p>}
                            </div>
                            <div className='flex items-center'>
                                <div className='p-2 hover:bg-yellow-200 rounded-full cursor-pointer'>
                                    <CiBookmark className='text-[#536471]' size="22px" />
                                </div>
                                <p>0</p>
                            </div>
                            <div className='flex items-center'>
                                <div className='p-2 hover:bg-yellow-200 rounded-full cursor-pointer'>
                                    <RiShare2Line className='text-[#536471]' size="20px" />
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
                    <div>
                        <div className='flex items-center p-4'>
                            <div>
                                <Avatar src={name?name.pfp:"https://i.pinimg.com/564x/92/5c/bb/925cbb0d8ecf1a5a64f36ffe91694029.jpg"} size="40" round={true} />
                            </div>
                            <input
                                value={content} // Bind value to state
                                onChange={(e) => setContent(e.target.value)}
                                className='w-full outline-none border-none text-xl ml-2'
                                type="text"
                                placeholder='Post your reply'
                            />
                        </div>
                        <div className='flex items-center justify-between p-4 border-b border-gray-300'>
                            <div>
                                <CiImageOn className='text-blue-500' size="24px" />
                            </div>
                            <button

                                className='bg-[#1D9BF0] px-4 py-1 text-lg text-white text-right border-none rounded-full'>
                                Reply
                            </button>
                        </div>
                    </div>

            </div>





        </div>
    )
}


export default Tweetbyid