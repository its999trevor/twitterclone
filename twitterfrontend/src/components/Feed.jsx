import React,{ useState, useEffect } from 'react'
import CreatePost from './CreatePost'
import api from "./api";
import Tweet from './Tweet'
const Feed = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
      getTweet();
  }, [tweets]);

  async function getTweet() {
      const response = await api.get("/tweet/");
      setTweets(response.data);
      // console.log(response.data);
  }
  return (
    <div className='w-[598px] border border-gray-200'>
      <div>
      <CreatePost/>

      {tweets.map(tweet => (
      <div key={tweet.id}>
      <Tweet tweet={tweet} />
      </div>
      
    ))} 
      </div>
    </div>
  )
}

export default Feed
