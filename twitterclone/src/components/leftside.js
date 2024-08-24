import React from 'react'
import { CiHome } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineTravelExplore } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { getmyProfile, getOtherUsers, getUser } from '../redux/userslice';
export default function Leftside() {
    const {user}=useSelector(store=>store.user);
    const navigate=useNavigate();
    const dispatch=useDispatch()
;    const logoutHandler = async()=>{
        try{
            const res=await axios.get(`${USER_API_END_POINT}/logout`);
            dispatch(getUser(null));
            dispatch(getOtherUsers(null));
            dispatch(getmyProfile(null));
           
            navigate("/login");
            console.log(res);
            toast.success(res.data.message);


        }
        catch(error){
            toast.success(error.response.data.message);
            console.log(error);
        }
    }
    return (
        <div className='w-[20%]'><div>

            <div className='mx-4'>
                <img  width={"30px"}src="https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?w=740&t=st=1721365176~exp=1721365776~hmac=75aad66f8fb59c1d08e6e79beade762fa22a3d636f46684354dd320476e1f9c5" alt="image" />
            </div>
            <div className='my-4 mx--1'>
                <Link to='/' className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                <CiHome size="24px"/>
                <h1 className='mx-1 font-bold text-lg'>Home</h1>
                </Link>
                <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                <MdOutlineTravelExplore size="24px"/>
                <h1 className='mx-5 font-bold text-lg'>Explore</h1>
                </div>
                <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                <IoMdNotificationsOutline size="24px"/>
                <h1 className='mx-5 font-bold text-lg'>Notifications</h1>
                </div>
                <Link to={`/profile/${user?._id}`} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                <CgProfile size="24px"/>
                <h1 className='mx-5 font-bold text-lg'>Profile</h1>
                </Link>
                <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                <FaRegBookmark size="24px"/>
                <h1 className='mx-5 font-bold text-lg'>Bookmarks</h1>
                </div>
                <div onClick={logoutHandler} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 rounded-full hover:cursor-pointer'>
                <TbLogout size="24px"/>
                <h1 className='mx-5 font-bold text-lg'>Logout</h1>
                </div>
                <button className='px-4 py-2  border-none text-md bg-[#1098F0] w-full rounded-full text-white font-bold'>Post</button>
               

               
            </div>
        </div>
        </div>
    )
}
