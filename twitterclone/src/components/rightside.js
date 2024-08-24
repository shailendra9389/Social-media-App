import React from 'react'
import Avatar from 'react-avatar';
import { IoMdSearch } from "react-icons/io";
import { Link } from 'react-router-dom';
export default function Rightside({otherUsers}) {
  return (
    <div className='w-[25%] '>
      <div className='px-2 py-2 bg-gray-100 rounded-full outline-none mt-2 flex items-center '>
        
        <IoMdSearch size="24px"/>
        <input type="text" placeholder="Search..."  className='bg-gray-100 outline-none w-full px-1'/>
        
        
      </div>
      <div className='py-3 mt-3 bg-gray-100 rounded-xl'>
        <div className='p-2 bg-gray-50 rounded-500 w-full' >
          <h1 className='font-bold text-lg my-3 mx-2'>Who to follow</h1>
          {
            otherUsers?.map((user)=>{
              return(
                <div key={user?._id} className='flex justify-between mt-3 '>
                <div className='flex '>
                  <div>
                  <Avatar src="https://img.freepik.com/premium-photo/memoji-happy-man-white-background-emoji_826801-6836.jpg?size=626&ext=jpg&ga=GA1.1.1227179335.1721365181&semt=sph" className='rounded-full' size="40" />
                  </div>
                
                <div className='ml-1'>
                  <h2 className='font-semibold'>{user?.name}</h2>
                  <p className='text-gray-500  text-sm'>{`@${user?.username}`}</p>
                </div>
                
                </div>
                <div>
                <Link to={`/profile/${user?._id}`}>
  <button className='bg-black rounded-full text-white px-4 py-1 ml-0'>
    Profile
  </button>
</Link>
                
                </div>
               
              </div>

              )
             

            })
          }
         
         
          
        </div>
      </div>
    </div>
  )
}
