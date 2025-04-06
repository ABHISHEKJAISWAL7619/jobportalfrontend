
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Navbar from './shared/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Jobs from './pages/Jobs'
import Browse from './pages/Browse'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify';
import Profile from './pages/Profile'
import Jobdescription from './components/Jobdescription'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
import { updateuser } from './store/UserSlice'
import UseGetAllJob from './Costomhooks/UseGetAllJob'
import Trail from './pages/Trail'
import Companies from './admin/Companies'
import Companycreate from './admin/Companycreate'
import Companysetup from './admin/Companysetup'
import Jobsadmin from './admin/Jobsadmin'
import Jobcreate from './admin/Jobcreate'
import Applicants from './admin/Applicants'
// import ProtectedRoute from './admin/ProtectedRoute'



function App() {

  let dispatch = useDispatch();

  const userstore= useSelector((state)=>state.user)
  console.log(userstore)



  const getUserdetails  = async()=>{
    let res = await axios.get("https://mernjobportal-wjod.onrender.com/user/getuser",{
      headers:{ 
        "Authorization":userstore.token
      }
    })
    let data = res.data;
    console.log(data)
    dispatch(updateuser(data))
  }


  useEffect(()=>{
   if(userstore.token){
    getUserdetails()
   }
  },[userstore.token])
  

  return (
    <>
   
    <BrowserRouter>
   <div className=' '>
   <Navbar/>
   </div>
    <Routes>
      <Route path="/" element={ <Home/>}/>
      <Route path="/Login"  element={<Login/>} />
      <Route path="/Signup"  element={<Signup/>} />
      <Route path="/Jobs"  element={<Jobs/>} />
      <Route path="/Browse"  element={<Browse/>} />
      <Route path="/Profile"  element={<Profile/>} />
      <Route path="/Description/:id"  element={<Jobdescription/>} />
      <Route path="/getalljob"  element={<UseGetAllJob/>} />
      <Route path="/trail"  element={<Trail/>} />
      <Route path="/admin/companies"  element={  <Companies/>} />
       <Route path="/admin/companies/create"  element={<Companycreate/>} />
       <Route path="/admin/companies/:id"  element={<Companysetup/>} /> 
         <Route path="/admin/jobs"  element={<Jobsadmin/>} />     
         <Route path="/admin/jobs/create"  element={<Jobcreate/>} />
         <Route path="/admin/jobs/:id/"  element={<Applicants/>} />






    </Routes>
     <ToastContainer />
    </BrowserRouter>
   

    
    </>
  )
}

export default App
