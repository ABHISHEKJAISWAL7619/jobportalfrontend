import { useSelector } from "react-redux";
import { Badge } from "../components/badge";
import React, { useState, useEffect } from 'react';
import { Button } from "/src/components/button";
import { Avatar, AvatarImage } from "/src/components/avatar";

const LatestJobcards = () => {
  // Fetch job data from Redux store
  const jobstore = useSelector((state) => state.AllJob);
  console.log(jobstore)
  
  // Check if jobs are loaded (add fallback check)
  const jobs = jobstore?.allJobs?.jobs;

  if (!jobs) {
    return <div>Loading...</div>;  // Display a loading message or spinner if jobs are not available
  }

  return (
    <>
      {jobs?.slice(0,6).map((items) => (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-400 cursor-pointer' key={items._id}>
          <Button className="p-6" variant="outline" size="icon">
                <Avatar className="h-12 w-12 rounded" >
                  <AvatarImage  src={items?.company?.logo} />
                </Avatar>
              </Button>
          <div>
            <h1 className="font-medium text-lg ">{items?.company?.name}</h1>
            <p className="text-sm text-gray-500">{items.location}</p>
          </div>
          <div>
            <h1 className="font-bold text-lg my-2">{items.title}</h1>
            <p className="text-sm text-gray-600">{items.description}</p>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={'text-blue-700 font-bold border-none '} variant="ghost">
              {items.position}
            </Badge>
            <Badge className={'text-[#F83002] font-bold border-none'} variant="ghost">
              {items.jobtype}
            </Badge>
            <Badge className={'text-[#7209b7] font-bold border-none'} variant="ghost">
              {items.salary}
            </Badge>
          </div>
        </div>
      ))}
    </>
  );
};

export default LatestJobcards;