import React, { useEffect } from 'react'
import Leftside from './leftside';
import { Outlet, useNavigate} from 'react-router-dom';
import Rightside from './rightside';
import useOtherUsers from '../hooks/usetherUsers';
import { useSelector } from 'react-redux';
import useGetMyTweet from '../hooks/useGetMyTweet';


export default function Home() {
  //custom hook
  const {user,otherUsers}=useSelector(store=>store.user);
  const navigate=useNavigate();
  useEffect(()=>{
    if(!user){
      navigate("/login");
  
    }
  })
 
  useOtherUsers(user?._id);
  useGetMyTweet(user?._id);
  return (
    <div className='flex justify-between w-[80%] mx-auto mt-3'>
    <Leftside/>
    <Outlet/>
    <Rightside otherUsers={otherUsers}/>
    
    </div>
  )
}
