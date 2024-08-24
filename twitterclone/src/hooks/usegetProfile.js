import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getmyProfile } from "../redux/userslice";
export const useGetProfile=async(id)=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchmyProfile=async()=>{
            try{
                const res=await axios.get(`${USER_API_END_POINT}/profile/${id}`,{
                    withCredentials:true
            });
            dispatch(getmyProfile(res.data.user));
            }catch(error){
                console.log(error);
                
        
            }

        }
        fetchmyProfile();
       
},[id]);
 
};
export default useGetProfile;