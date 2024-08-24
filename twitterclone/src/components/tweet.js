import axios from 'axios';
import React from 'react'
import Avatar from 'react-avatar';
import { FaRegHeart,FaHeart } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa"; 
import { MdDeleteOutline } from "react-icons/md";

import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { TWEET_API_END_POINT, USER_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/tweetslice';
import { timeSince } from '../utils/constant';
 
export default function Tweet({tweet}) {
  const {user}=useSelector(store=>store.user);
  const dispatch=useDispatch();
  const deleteHandler=async(id)=>{
    try{
      const res=await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`,{
        withCredentials:true
      })
      dispatch(getRefresh());
      toast.success(res.data.message);
    }catch(error){
      toast.error(error.response?.data?.message || "Failed to delete the tweet.");
      console.log(error);
    }
  }
  const likeorDislikehandler=async(id)=>{
    
    try{
      const res=await axios.put(`${TWEET_API_END_POINT}/like/${id}`,{id:user?._id},{
        withCredentials:true
      })
      dispatch(getRefresh());
      
        toast.success(res.data.message);
      
    }catch(error){
      toast.success(error.response.data.message);
      console.log(error);
    }
  }
  const markorunmarked=async(id)=>{
    try{
      const res= await axios.put(`${USER_API_END_POINT}/bookmark/${id}`,{id:user?._id,},{
        withCredentials:true
      })
      console.log(res);
      dispatch(getRefresh());
        toast.success(res.data.message);
    }catch(error){
      toast.success(error.response.data.message);
      console.log(error);

    }
  }
  const isLiked = tweet?.like?.includes(user?._id);
  const isBookmarked = user?.bookmark?.includes(user?._id);
  return (
    <div className='border-b border-gray-2'>
        <div>
            <div className='flex  p-4'>
            <Avatar src="https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg" size="50" round={true} />
            <div className='ml-2 w-full'>
            <div className='flex items-center '>
                <h1 className='text-bold'>{tweet?.userDetails[0]?.name}</h1>
                <p className='text-gray-500 text-sm ml-1'>{`@${tweet?.userDetails[0]?.username}. ${timeSince(user?.createdAt)}`}</p></div> 
                
                <div>
                    <p>{tweet?.description}</p>
                </div>
                <div className='flex justify-between my-3'>
                   <div className='flex items-center'>
                    <div onClick={()=>likeorDislikehandler(tweet?._id)} className={`p-2 rounded-full cursor-pointer ${isLiked ? 'hover:bg-red-100 text-red-500' : 'hover:bg-blue-100 text-gray-500'}`}>
                    {isLiked ? <FaHeart size="20px" /> : <FaRegHeart size="20px" />}</div>
                   <p className='ml-1'>{tweet?.like?.length}</p></div> 
                   <div className='flex items-center'>
                    <div className='p-2 hover:bg-blue-100 rounded-full cursor-pointer'><FaRegCommentAlt size="20px"/></div>
                   <p className='ml-1'>2</p></div> 
                   <div className='flex items-center'>
                    <div onClick={()=>markorunmarked(tweet?._id)} className={`p-2  rounded-full cursor-pointer ${isBookmarked ? 'hover:bg-red-500 text-red-500' : 'hover:bg-blue-100 text-gray-500'}`} >
                    {isBookmarked ? <FaBookmark size='20px' /> : <FaRegBookmark size='20px' />}</div>
                   <p className='ml-1'>{tweet?.bookmark?.length}</p></div> 
                   
                  {
                    user?._id===tweet?.userDetails[0]?._id &&(
                      <div className='flex items-center'>
                    <div onClick={() => deleteHandler(tweet?._id)} className='p-0 hover:bg-red-300 rounded-xl cursor-pointer'><MdDeleteOutline size="24px"/>
                    </div>
                   </div>
                      
                    )
                   } 
                </div>

                

            </div>
            </div> 
        </div>
    </div>
  )
}
