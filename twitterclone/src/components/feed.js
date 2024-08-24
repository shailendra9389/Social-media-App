import React from 'react'
import CreatePost from './CreatePost.js';
import Tweet from './tweet.js';
import { useSelector } from 'react-redux';
export default function Feed() {
  const {tweets}=useSelector(store=>store.tweet);
  return (
    <div className='w-[50%] border'>
      <div >
        
        <CreatePost/>
        {
          tweets?.map((tweet)=>
            <Tweet key={tweet?._id} tweet={tweet}/>
          )
        }
        
        
        </div>
        
      
    </div>
  )
}
