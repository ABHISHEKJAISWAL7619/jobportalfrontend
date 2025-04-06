import { configureStore } from '@reduxjs/toolkit'
import UserSlice  from "./UserSlice"
import  JobSlice  from './JobSlice'
import Companyslice from './Companyslice'
import Applicationslice from "./Applicationslice"


export const store = configureStore({
  reducer: {
    user:UserSlice,
    AllJob:JobSlice,
    company:Companyslice,
    application:Applicationslice
  },
})