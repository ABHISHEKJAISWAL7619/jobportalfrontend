import { createSlice } from '@reduxjs/toolkit'

let details  = JSON.parse(localStorage.getItem("JobportalAuth"))
const initialState = {
  login:details? details.login :false  ,
  user:details? details.user : '',
  token:details? details.token : ""
}

export const UserSlice = createSlice({
  name: 'User',
  initialState:initialState,
  reducers: {
    setstate:(state,action)=>{
        console.log(action.payload);
        localStorage.setItem('JobportalAuth',JSON.stringify({login:true,token:action.payload.token, user:""}))
        state.login = true;
        state.token = action.payload.token;
    },
    updateuser:(state,action)=>{
      console.log(action.payload)
      localStorage.setItem('JobportalAuth',JSON.stringify({login:true,token:state.token, user:action.payload.user}))
      state.user = action.payload.user
        
    },
    logout:(state,action)=>{
      localStorage.removeItem("JobportalAuth");
      state.login = false;
      state.user = "";
      state.token = "";
       
    }
  
  },
})

// Action creators are generated for each case reducer function
export const { setstate , updateuser, logout } = UserSlice.actions

export default UserSlice.reducer