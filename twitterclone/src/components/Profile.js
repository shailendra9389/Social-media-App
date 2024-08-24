import React from 'react'
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import useGetProfile from '../hooks/usegetProfile';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { followingUpdate } from '../redux/userslice';
import { getRefresh } from '../redux/tweetslice';
export default function Profile() {
  const {user,profile}=useSelector(store=>store.user);

  
  const {id}=useParams();
   useGetProfile(id);
   const dispatch=useDispatch();
   const followandunfollowhandler=async()=>{
    
    if(user.following.includes(id)){
      //unfollow
      try{
        const res=await axios.post(`${USER_API_END_POINT}/unfollow/${id}`,{id:user?._id},{
          withCredentials:true
        })
        console.log(res);
        dispatch(followingUpdate(id))
        toast.success(res.data.message);
        dispatch(getRefresh());
      }catch(error){
        toast.success(error.response.data.message ||"some error is detected in unfollwoing");
        console.log(error);
      }


    }else{
        //follow
        try{
          const res=await axios.post(`${USER_API_END_POINT}/follow/${id}`,{id:user?._id},{
            withCredentials:true
          })
          console.log(res);
          dispatch(followingUpdate(id))
          toast.success(res.data.message);
          dispatch(getRefresh());
  
        }catch(error){
          toast.success(error.response.data.message|| "some error is deted in follwoing user");
          console.log(error);
        }
    }
    

   }
  return (
    <div className='w-[50%] border-gray-200'><div>
      <div className='flex items-center py-2'>
        <Link to='/' className='p-2 rounded-full hover:bg-gray-100 cursor-pointer items-center'>
          <IoMdArrowRoundBack size="20px" />
        </Link>



        <div className='ml-4'><h1 className='font-bold text-lg'>{profile?.name}</h1>
          <p className='text-sm text-gray-700'>2 posts</p>
        </div></div>
      <img src="https://pbs.twimg.com/profile_banners/1631974130735259649/1693395738/1500x500" alt="image" className='h-[50%]' ></img>
      <div className='absolute top-52 border-2 ml-2 border-white rounded-full ' >
        <Avatar src="https://img.freepik.com/premium-photo/graphic-designer-digital-avatar-generative-ai_934475-9292.jpg" size="100" round={true} className='ml-0' />
      </div>
      <div className='text-right mt-2'>
        {
          profile?._id===user?._id ?(
            <button className='px-4 py-1 border border-black rounded-full text-black font-semibold hover:bg-gray-200'>Edit Profile</button>
          ):(
            <button onClick={followandunfollowhandler} className='px-4 py-1 border border-black rounded-full text-white font-semibold bg-black'>{user.following.includes(id)?"Following":"Follow"}</button>
          )
        }
       
      </div>
      
        <div className='ml-4 mt-4'><h1 className='font-bold text-xl'>{profile?.name}</h1>
          <p className='text-sm text-gray-500'>{`@${profile?.username}`}</p>
        </div>
        <div className='mt-2 text-gray-600 text-sm'>
          <p>🌐Exploring Web devlopment/Software developer/Programmer/Software engineer</p>
        </div>
      

    </div></div>
  )
}
