import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    allJobs:[],
    allappliedjobs:[],
    searchjobquery:"",
   
 
}

export const JobSlice = createSlice({
  name: 'AllJob',  // Changed this to match the key in the store
  initialState: initialState,
  reducers: {
    setallJobs: (state, action) => {
    
      state.allJobs = action.payload;
    },
    setallappliedjobs: (state, action) => {
      state.allappliedjobs=action.payload
      },
      setsearchjobquery:(state, action)=>{
        state.searchjobquery = action.payload
      },
  }
  
});



export const { setallJobs,setallappliedjobs,setsearchjobquery  } = JobSlice.actions

export default JobSlice.reducer