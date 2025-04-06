// import React, { useEffect, useState } from 'react';
// import Applicantstable from './Applicantstable';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { setallapplications } from '/src/store/Applicationslice';

// const Applicants = () => {
//     let  dispatch = useDispatch();
//     const userstore  =useSelector((state)=>state.application)
//     console.log(userstore)
  
//   const usertoken = useSelector((state) => state.user); 
//   let token = usertoken.token;
// //   console.log(token) 

//   const { id } = useParams();  

//   useEffect(() => {
//     const fetchApplicants = async () => {
//       try {
       
//         const res = await axios.get(
//           `http://localhost:9070/application/getapplicants/${id}`,
//           {
//             headers: {
//               Authorization: ` ${token}` 
//             }
//           }
//         );
//         console.log(res.data.job.applications); 
       
//             dispatch(setallapplications(res.data.job))

//         }
    
//        catch (error) {
//         console.error("Error fetching applicants", error); 
//       }
//     };

//     if (id && token) {
//       fetchApplicants(); 
//     }
//   }, [id, token]);  
//   return (
//     <div>
//       <div className="max-w-7xl mx-auto">
//         <h1 className="font-bold text-xl">Applicants(2)</h1>
//         <Applicantstable/>

//       </div>
//     </div>
//   );
// };

// export default Applicants;
import React, { useEffect, useState } from 'react';
import Applicantstable from './Applicantstable';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setallapplications } from '/src/store/Applicationslice';

const Applicants = () => {
  const dispatch = useDispatch();
  const userstore = useSelector((state) => state.application);
  const usertoken = useSelector((state) => state.user);
  const token = usertoken.token;
  const { id } = useParams();

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `https://mernjobportal-wjod.onrender.com/application/getapplicants/${id}`,
          {
            headers: {
              Authorization: ` ${token}`,
            },
          }
        );
        console.log(res.data.job.applications);
      
        dispatch(setallapplications(res.data.job));
      } catch (error) {
        console.error('Error fetching applicants', error);
      }
    };

    if (id && token) {
      fetchApplicants();
    }
  }, [id, token]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl mb-4">
          Applicants ({userstore?.allapplications?.applications?.length || 0})
        </h1>
        <div className="overflow-x-auto">
          <Applicantstable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;

