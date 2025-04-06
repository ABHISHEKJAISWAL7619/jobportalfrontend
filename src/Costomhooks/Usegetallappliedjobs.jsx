import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setallappliedjobs } from '/src/store/JobSlice';
import { useEffect } from 'react';
// import setallappliedjobs  from '../store/JobSlice';

const Usegetallappliedjobs = () => {
    const dispatch  = useDispatch();
    const usertoken =useSelector((state)=>state.user)
    // console.log(usertoken.token)


   useEffect(()=>{

  
        const fetchallappliedjobs = async()=>{
            try {
                const res = await axios.get("https://mernjobportal-wjod.onrender.com/application/getappliedjobs",
                    {
                      headers: {
                        Authorization: ` ${usertoken.token}` 
                      }
                    })
                  
                   

                
                    console.log(res.data.application)
                    if(res.data.success){
                        dispatch(setallappliedjobs(res.data));
                    }
                
            } catch (error) {
                console.log(error)
                
            }
        }
        fetchallappliedjobs();
    },[])
   

  
}

export default Usegetallappliedjobs
