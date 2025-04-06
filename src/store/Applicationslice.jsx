import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    applications:[],
   
 
}

export const JobSlice = createSlice({
  name: 'Applications',  // Changed this to match the key in the store
  initialState: initialState,
  reducers: {
    setallapplications: (state, action) => {
      console.log(state);
      console.log(action);
      state.applications = action.payload;
    },
    
  },
});



export const { setallapplications  } = JobSlice.actions

export default JobSlice.reducer