import axios from 'axios';
import React, { useState } from 'react'
import Avatar from 'react-avatar';
import { FaImage } from "react-icons/fa6";
import { TWEET_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTweet, getIsActive, getRefresh } from '../redux/tweetslice';
export default function CreatePost() {
  const [description,setDescription]=useState("");
  const {user}=useSelector(store=>store.user);
  const {isActive}=useSelector(store=>store.tweet)
  const dispatch=useDispatch();

  const submitHandler=async (e)=>{
    try{
      const res=await axios.post(`${TWEET_API_END_POINT}/create`,{description , id:user?._id},{
        withCredentials:true, 
      });
      dispatch(getRefresh());

      if(res.data.success){
       toast.success(res.data.message);

      }

    }catch(error){
      toast.error(error.response.data.message);
      console.log(error);
    }
    setDescription("");


  }
  const forYouHandler=()=>{
    dispatch(getIsActive(true));
  }
  const followingHandler=()=>{
    dispatch(getIsActive(false));

  }
  return (
    <div className='w-[100%] '>
            <div className=' m-3' >
        <div className='flex  items-center justify-between border-b border-gray-200'>
            <div onClick={forYouHandler} className={`${isActive ? "border-b-4 border-blue-600":null} hover:cursor-pointer hover:bg-gray-200 w-full  text-center px-4 py-3`}>
                <h1 className='font-semibold text-gray-600  text-lg hover:cursor-pointer'>For you</h1>
            </div>
            <div  onClick={followingHandler} className={`${!isActive ? "border-b-4 border-blue-600":null} hover:cursor-pointer  hover:bg-gray-200 w-full text-center px-4 py-3`}>
                <h1 className='font-semibold text-gray-600  text-lg '>Following</h1>
            </div>
        </div>
    
        <div>
            
        
        <div className='flex felx items-center p-4'>
            <div>
            <Avatar src="https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg" size="50" round={true} />
            </div>
            <textarea value={description}  onChange={(e)=>{setDescription(e.target.value)}} className='w-full outline-none border-none text-lg ml-2'type='text' placeholder="What is happening?!"/>
        </div>
        <div className='flex items-center justify-between p-4 border-b border-gray-300'>
            <div><FaImage /></div>
          <button  onClick={submitHandler} className='bg-[] px-4 py-1 border-none bg-[#1098F0] rounded-full text-white font-bold'>Post</button> 
        </div>
        </div>
        </div>
    </div>
  )
}
