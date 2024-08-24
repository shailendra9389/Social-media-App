import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweet } from "../redux/tweetslice";

const useGetMyTweet=(id)=>{
    const dispatch=useDispatch();
    const {refresh}=useSelector(store=>store.tweet);
    const {isActive}=useSelector(store=>store.tweet)
    const fetchmyTweets=async()=>{
        try{
            const res=await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`,{
                withCredentials:true
        });
        console.log(res);
        dispatch(getAllTweet(res.data.tweets));
        }catch(error){
            console.log(error);
            
    
        }

    }
    const followingtweet=async()=>{
        
        try{
          const res = await axios.get(`${TWEET_API_END_POINT}/followingtweet/${id}`, {
            withCredentials: true, // Make sure this is included
        });
          console.log(res);
          dispatch(getAllTweet(res.data.tweets));
          // dispatch(getRefresh());
          
        } catch(error){
          console.log(error);
        }
    
      }
    
    useEffect(()=>{
        if(isActive){
            fetchmyTweets();
        }else{
            followingtweet();
        }
        },[isActive,refresh]);
 
};
export default useGetMyTweet;