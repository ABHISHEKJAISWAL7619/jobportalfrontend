import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCompanies } from '../store/Companyslice';

const UseGetAllCompanies = () => {
    const dispatch  = useDispatch();
    const usertoken =useSelector((state)=>state.user)
    // console.log(usertoken.token)
    useEffect(()=>{
        const fetchcompanies = async()=>{
            try {
                const res = await axios.get("https://mernjobportal-wjod.onrender.com/company/getcompany",
                    {
                      headers: {
                        Authorization: ` ${usertoken.token}` 
                      }
                    })
                   if(res.data.success){
                    dispatch(setCompanies(res.data))
                   }
                    console.log(res.data)
                
            } catch (error) {
                console.log(error)
                
            }
        }
        fetchcompanies();
    },[])

  
}

export default UseGetAllCompanies
