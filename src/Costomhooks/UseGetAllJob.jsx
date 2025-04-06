import axios from 'axios';
import { useState, useEffect } from 'react';  // Import useState and useEffect
import { useDispatch, useSelector } from 'react-redux';
import { setallJobs } from '../store/JobSlice';

export default function UseGetAllJob() {
  const searchquery = useSelector((state)=>state.AllJob)
  

  const dispatch = useDispatch();
  useEffect(() => {
  const jobData = async () => {
    try {
      const fetchData = await axios.get(`https://mernjobportal-wjod.onrender.com/job/getalljob?Keyword=${searchquery}`);
      console.log(fetchData.data);
   
    dispatch(setallJobs(fetchData.data));  
  
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
    jobData();  
  }, []); 

  return (
    <>
    
    </>
  );
}
