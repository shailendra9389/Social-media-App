import React, { useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/userslice';
export default function Login() {
  const [isLogin, setisLogin]=useState(true);
  const [name,setName]=useState("");
  const [username,setUserName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const submitHandler=async (e)=>{
    e.preventDefault();
    if(isLogin){
      //login
      try{
        const res=await axios.post(`${USER_API_END_POINT}/login`, {email,password},{
          headers:{
            'Content-Type':"application/json"
          },
          withCredentials:true
        });
        console.log(res);
        dispatch(getUser(res?.data?.user));
        if(res.data.success){
          navigate("/");
          toast.success(res.data.message);

        }
      }catch(error){
        toast.error(error.response.data.message);
        console.log(error);
      }
    }else{

      //signup
      try{
        const res=await axios.post(`${USER_API_END_POINT}/register`, {name,username,email,password},{
          headers:{
            'Content-Type':"application/json"
          },
          withCredentials:true
        });
        console.log(res);
        if(res.data.success){
          setisLogin(true);
          toast.success(res.data.message);

        }
      }catch(error){
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  }
  
  const loginSignupHandler=()=>{
    setisLogin(!isLogin);
  }

  return (
    <div className='text-center w-screen h-screen flex items-center justify-center'>
      <div className='flex itmes-center justify-evenly w-[80%] '><div>
        <img  width={"400px"} src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?t=st=1721365173~exp=1721365773~hmac=f7c053af77ee4c3fe2a47d57907883ef4a43d76c441b729adb262156e50663f4" alt="image" className='ml-5' />
      </div>
        <div>
          <div className='my-5'>
            <h1 className='font-bold text-6xl'>Happening now?</h1>
          </div>
          <h1 className='font-bold text-3xl text-left my-4'>{isLogin?"Login":"SignUp"}</h1>
          <form onSubmit={submitHandler} className='flex flex-col '>
            {
              !isLogin && (<>
              <input type='text' value={name}  onChange={(e)=> setName(e.target.value)} placeholder='Name ?' className='border border-gray-700 rounded-full  outline-gray-700 w-60 h-10 px-2 py-1 my-2 font-semibold' />
               <input type='text' value={username}  onChange={(e)=> setUserName(e.target.value)} placeholder='UserName ?' className='border border-gray-700 rounded-full  outline-gray-700 w-60 h-10 px-2 py-1 my-2 font-semibold' /> 
              {/* <input type='password' placeholder='Password ?' className='border border-gray-700 rounded-full  outline-gray-700 w-60 h-10 px-2 py-1 my-2 font-semibold' /> */}
              </>)
            }
           {/* <input type='text' placeholder='Name ?' className='border border-gray-700 rounded-full  outline-gray-700 w-60 h-10 px-2 py-1 my-2 font-semibold' /> 
            <input type='text' placeholder='UserName ?' className='border border-gray-700 rounded-full  outline-gray-700 w-60 h-10 px-2 py-1 my-2 font-semibold' />  */}
            <input type='email'  value={email} onChange={(e)=> setEmail(e.target.value)}  placeholder='Email ?' className='border border-gray-700 rounded-full  outline-gray-700 w-60 h-10 px-2 py-1 my-2 font-semibold' />
            <input type='password'  value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Password ?' className='border border-gray-700 rounded-full  outline-gray-700 w-60 h-10 px-2 py-1 my-2 font-semibold' />
            <button className="text-white font-semibold rounded-full bg-black border border-gray-3000 w-[50%] p-2 my-3" >{isLogin?"Login":"Create Account?"}</button>
            <h1 className='text-left'>{isLogin?"Do not have an account?" :"Already have an account?"}<span className='text-blue-500 cursor-pointer' onClick={loginSignupHandler}>{isLogin? "Signup":"Login"}</span></h1>
            
          </form>
          
          
        </div>
      </div></div>
  )
}
