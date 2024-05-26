import React, { useState, useEffect } from 'react';
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { IoHeartOutline,IoHeartSharp } from "react-icons/io5";
import { BiRepost } from "react-icons/bi";
import { RiShare2Line } from "react-icons/ri";
import { CiBookmark } from "react-icons/ci";
import Handlers from './Handlers';
import { useNavigate } from 'react-router-dom';

const Tweet = ({tweet}) => {


    const fileType = getFileType(tweet.filepath);
    const navigate=useNavigate();
    const [like,setLike]=useState(false)
    const [retweet, setRetweet] = useState(false);
    const [likeCount, setLikeCount] = useState(tweet.likecount);
    const [retweetCount, setRetweetCount] = useState(tweet.retweetCount);


  
    useEffect(() => {
        // Function to check if the tweet is already liked by the user
        async function checkIfLiked() {
            const response = await Handlers.checkIfLiked(tweet.id);
            if (response) {
                setLike(response.isLiked);
            }
        }
        async function checkIfRetweeted() {
            const response = await Handlers.checkIfRetweeted(tweet.id);
            if (response) {
                setRetweet(response.isRetweeted);
            }
        }
        checkIfLiked();
        checkIfRetweeted();


    }, [tweet.id]);

    async function tweetHandler(userid, tweetid) {
        navigate(`/${userid}/status/${tweetid}`);
    }

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

    return (
        <div className='border-b border-gray-200'>
            <div className='flex p-4 hover:bg-gray-200 w-full' onClick={() => tweetHandler(tweet.userid, tweet.id)}>
                <Avatar src={tweet ? tweet.user.pfp : "https://i.pinimg.com/564x/92/5c/bb/925cbb0d8ecf1a5a64f36ffe91694029.jpg"} size="40" round={true} />
                <div className='ml-2 w-full'>
                    <div className='flex items-center'>
                        <h1 className='font-bold'>{tweet.user.fullname}</h1>
                        <p className='text-gray-500 text-sm ml-1'>@{tweet.userid}</p>
                    </div>
                    <div>
                        <p>{tweet.content}</p>
                    </div>

                    {tweet.filepath && (
                        <div style={{ position: 'relative', display: 'inline-block', marginTop: '10px' }}>
                            {fileType === 'image' && (
                                <img src={tweet.filepath} alt="Uploaded" className='rounded-xl mx-12 my-2' style={{ width: "100%", maxWidth: '85%' }} />
                            )}
                            {fileType === 'video' && (
                                <video className='rounded-xl mx-12 my-2' controls style={{ width: "100%", maxWidth: '85%' }} autoPlay muted>
                                    <source src={tweet.filepath} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    )}

                    <div className='flex justify-between my-3'>
                        <div className='flex items-center'>
                            <div className='p-2 hover:bg-blue-200 rounded-full cursor-pointer'>
                                <FaRegComment className='text-[#536471]' size="20px" onClick={(e) => e.stopPropagation()} />
                            </div>
                            <p className='text-[#536471]'>0</p>
                        </div>
                        <div className='flex items-center'>
                            <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'
                                onClick={handleRetweet}>
                                {retweet ? <BiRepost className='text-[#00BA7c]' size="24px" /> : <BiRepost className='text-[#536471]' size="20px" />}
                            </div>
                            {retweet ? <p className='text-[#00BA7c]'>{retweetCount}</p> : <p className='text-[#536471]'>{retweetCount}</p>}
                        </div>
                        <div className='flex items-center'>
                            <div
                                className='p-2 hover:bg-pink-200 rounded-full cursor-pointer'
                                onClick={handleLike}>
                                {like ? <IoHeartSharp size="24px" className='text-[#f91880]' /> : <IoHeartOutline className='text-[#536471]' size="24px" />}
                            </div>
                            <p className={like ? 'text-[#f91880]' : 'text-[#536471]'}>{likeCount}</p>
                        </div>
                        <div className='flex items-center'>
                            <div className='p-2 hover:bg-blue-200 rounded-full cursor-pointer'>
                                <CiBookmark onClick={(e) => e.stopPropagation()} className='text-[#536471]' size="22px" />
                            </div>
                            <p className='text-[#536471]'>0</p>
                        </div>
                        <div className='flex items-center'>
                            <div className='p-2 hover:bg-blue-200 rounded-full cursor-pointer'>
                                <RiShare2Line onClick={(e) => e.stopPropagation()} className='text-[#536471]' size="20px" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const getFileType = (filepath) => {
    if (!filepath) {
        return 'unsupported'; // If filepath is null, return unsupported
    }

    const extension = filepath.split('.').pop().toLowerCase();

    if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif') {
        return 'image';
    } else if (extension === 'mp4') {
        return 'video';
    } else {
        return 'unsupported';
    }
};

export default Tweet;
