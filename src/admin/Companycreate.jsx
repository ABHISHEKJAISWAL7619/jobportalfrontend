import React, { useRef, useState } from 'react';
import { Label } from '/src/components/label';
import { Button } from '/src/components/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setsingleCompany } from '/src/store/Companyslice';

const Companycreate = () => {
  const dispatch = useDispatch();
  const nameref = useRef();
  const imageref = useRef(); 
  const navigate = useNavigate();

  const token = useSelector((state) => state.user.token);
  const imageUrlRef = useRef('');
  
    const [photo,setphoto] = useState({
     logo:''
    })
    console.log(photo)

  const registercompany = async () => {
    const obj = {
      name: nameref.current.value,
      logo: imageUrlRef.current, 
    };
    console.log(obj)

    try {
      const res = await axios.post(
        `https://mernjobportal-wjod.onrender.com/company/register`,
        obj,
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );

      if (res.data.success) {
        const companyId = res.data.company._id;
        dispatch(setsingleCompany(companyId));
        navigate(`/admin/companies/${companyId}`);
        toast.success(res.data.msg, { position: 'bottom-right', theme: 'dark' });
      }
    } catch (error) {
      toast.error("Something went wrong!", { position: 'bottom-right' });
    }
  };
  const handleImage = async (e) => {
    const file = e.target.files[0]; // ✅ Access file directly from the event
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'companylogo');
  
    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/dvpj3v8ds/upload`, formData);
      const data = res.data;
      console.log("secureurl=",data.secure_url)
      if (data.secure_url) {
        imageUrlRef.current = data.secure_url; // ✅ Save URL in ref
        toast.success("Image uploaded successfully", {
          position: 'bottom-right',
          theme: 'dark'
        });
      }
    } catch (err) {
      toast.error("Image upload failed", {
        position: 'bottom-right',
        theme: 'dark'
      });
    }
  };

  return (
    // <></>
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Your Company</h1>
          <p className="text-gray-500">
            What would you like to name your company? You can change this later.
          </p>
        </div>

        <div className="mb-6">
          <Label className="block mb-2">Company Name</Label>
          <input
            ref={nameref}
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="JobHunt, Microsoft, etc."
          />
        </div>
        <div className="mb-6">
          <Label className="block mb-2">Logo</Label>
          <input
              ref={imageref}
            onChange={handleImage}
            type="file"
            accept="image/*"
            className="w-24 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400  "
            placeholder="JobHunt, Microsoft, etc."
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
          <Button
            onClick={() => navigate('/admin/companies')}
            className="bg-blue-200 text-black"
          >
            Cancel
          </Button>
          <Button
            onClick={registercompany}
            className="bg-amber-950 text-white"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Companycreate;
//   import React, { useRef } from 'react'
// import { Label } from '/src/components/label'
// import { Button } from '/src/components/button'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { useDispatch, useSelector } from 'react-redux'
// // import { store } from '/src/store/store'
// import { toast } from "react-toastify";
// import { setsingleCompany } from '/src/store/Companyslice'


// const Companycreate = () => {

//     const dispatch = useDispatch();

//     let nameref  = useRef();
//     let userstore = useSelector((state)=>state.user)
//     // console.log(userstore.token)
//     let navigate = useNavigate();
//     let token = userstore.token;

//     const registercompany = async()=>{
//         let obj  = {
//             "name": nameref.current.value
//         }
//         console.log(obj)

        
//         try {
//             const res = await axios.post(
//                 http://localhost:9070/company/register, 
//                 obj, 
//                 {
//                   headers: {
//                     Authorization:  ${token} 
//                   }
//                 }
//               );
//               console.log(res.data)
//               if(res.data.success){
//                 //    console.log(res.data)
//                 const companyId  = res.data.company._id;
//                 dispatch(setsingleCompany(companyId))
//                    navigate(/admin/companies/${companyId});

//                    console.log(companyId)

//                   toast.success(res.data.msg,{position:'bottom-right',theme:'dark'})

                 
//                  }
            
//         } catch (error) {
            
//         }

//     }
//   return (
//     <div>
//      <div className='max-w-4xl mx-auto' >
//         <div className='my-10' >
//         <h1 className='font-bold text-2xl' >
//             Your Company
//         </h1>
//         <p className='text-gray-500 ' >
//             What would you like to give your commpany name ? You can change this later
//         </p>
//         </div>
//         <Label>Company Name</Label>
//         <input ref={nameref} type="text" className='my-2 border border-gray-700 ' placeholder='JobHunt , Microsoft etc' />
//         <div>
//             <Button  onClick={()=>navigate("/admin/companies")} className="bg-blue-200" >Cancil</Button>
//             <Button  onClick={registercompany} className="bg-amber-950 ml-5" >Continue</Button>
//         </div>
//      </div>
//     </div>
//   )
// }

// export default Companycreate
