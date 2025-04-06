import React from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Usegetallappliedjobs from "/src/Costomhooks/Usegetallappliedjobs";

const Jobdescription = () => {
  Usegetallappliedjobs();
  const usertoken = useSelector((state) => state.user);
  const userId = usertoken?.user?._id;
  const singlejob  = useSelector((state)=>state.AllJob)
  const  singlejobone =singlejob?.allappliedjobs?.application;
  console.log(singlejob?.allappliedjobs?.application)
  const isApplied = singlejobone?.some(application=>application.applicant===userId) || false
  var token = usertoken?.token;
  // const isApplied = false;

  const location = useLocation();
  const data = location?.state;
  const JobId = data?._id;

  const handleapply = async (e) => {
    e.preventDefault();
  
    if (!token) {
      console.error("No token found. User might not be logged in.");
      alert("Please log in first.");
      return;
    }
  
    try {
      console.log("Sending token:", token);
  
      const res = await axios.post(
        `https://mernjobportal-wjod.onrender.com/application/applyjob/${JobId}`,
        {},
        {
          headers: {
            Authorization:` ${token}`,
          },
        }
      );
  
      console.log("Applied successfully:", res.data);
      alert("Job applied successfully!");
    } catch (error) {
      console.error("Apply error:", error.response?.data || error.message);
      alert(error.response?.data?.msg || "Something went wrong!");
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-bold text-xl sm:text-2xl">{data?.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Badge className="text-blue-700 font-bold border-none" variant="ghost">
              {data?.position}
            </Badge>
            <Badge className="text-[#F83002] font-bold border-none" variant="ghost">
              {data?.jobtype}
            </Badge>
            <Badge className="text-[#7209b7] font-bold border-none" variant="ghost">
              {data?.salary}
            </Badge>
          </div>
        </div>

        <Button
          onClick={handleapply}
          disabled={isApplied}
          className={`rounded-lg border border-gray-200 px-5 py-2 text-sm transition ${
            isApplied
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad] text-white"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Section Divider */}
      <h2 className="border-b-2 border-gray-200 font-semibold text-lg py-3">
        {data?.description}
      </h2>

      {/* Job Details */}
      <div className="mt-4 space-y-3 text-sm sm:text-base">
        <p>
          <strong>Role:</strong>
          <span className="pl-2 text-gray-700 font-normal">{data?.title}</span>
        </p>
        <p>
          <strong>Location:</strong>
          <span className="pl-2 text-gray-700 font-normal">{data?.location}</span>
        </p>
        <p>
          <strong>Description:</strong>
          <span className="pl-2 text-gray-700 font-normal">{data?.description}</span>
        </p>
        <p>
          <strong>Experience:</strong>
          <span className="pl-2 text-gray-700 font-normal">{data?.experiencelevel}</span>
        </p>
        <p>
          <strong>Salary:</strong>
          <span className="pl-2 text-gray-700 font-normal">{data?.salary}</span>
        </p>
        <p>
          <strong>Total Applicants:</strong>
          <span className="pl-2 text-gray-700 font-normal">
            {data?.applications?.length}
          </span>
        </p>
        <p>
          <strong>Posted Date:</strong>
          <span className="pl-2 text-gray-700 font-normal">{data?.createdAt}</span>
        </p>
      </div>
    </div>
  );
};

export default Jobdescription;
