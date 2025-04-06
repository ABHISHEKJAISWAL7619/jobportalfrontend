import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    singleCompany:null,
    companies:[],
   
 
}

export const JobSlice = createSlice({
  name: 'company', 
  initialState: initialState,
  reducers: {
    setsingleCompany: (state, action) => {
      
      state.singleCompany = action.payload;
      console.log(action)
    },
    setCompanies :(state,action)=>{
      state.companies = action.payload
      console.log("action:=", action.payload)
    }
    
  },
});



export const { setsingleCompany,setCompanies } = JobSlice.actions

export default JobSlice.reducer