import React from 'react';
import { Button } from './button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from '../components/avatar';
import { Badge } from "../components/badge";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Job = () => {
  const jobstore = useSelector((state) => state.AllJob);
  const jobs = jobstore?.allJobs?.jobs || [];
  const navigate = useNavigate();

  return (
    <>
      {jobs.length === 0 ? (
        <div className="text-center py-6 text-gray-500">No jobs available at the moment.</div>
      ) : (
        jobs.map((items) => (
          <div
            key={items._id}
            className="w-full max-w-lg mx-auto p-4 sm:p-6 mb-6 rounded-lg shadow-md bg-white border border-gray-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-xs sm:text-sm">2 days ago</p>
              <Button variant="outline" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-4 mb-3">
              <Avatar>
                <AvatarImage
                  src={items?.company?.logo}
                  alt="Company Logo"
                />
              </Avatar>
              <div>
                <h2 className="font-semibold text-sm sm:text-base">{items.company?.name}</h2>
                <p className="text-gray-500 text-xs sm:text-sm">{items.location}</p>
              </div>
            </div>

            {/* Job Title & Description */}
            <div className="mb-3">
              <h1 className="font-bold text-base sm:text-lg">{items.title}</h1>
              <p className="text-gray-600 text-sm mt-1">{items.description}</p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className="text-blue-700 font-semibold border-none" variant="ghost">
                {items.position}
              </Badge>
              <Badge className="text-[#F83002] font-semibold border-none" variant="ghost">
                {items.jobtype}
              </Badge>
              <Badge className="text-[#7209b7] font-semibold border-none" variant="ghost">
                {items.salary}
              </Badge>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              <Link state={items}
               to = {`/Description/${items._id}`}
                variant="outline"
                className="text-sm px-4 py-2"
              >
                Details
              </Link>
              <Button className="bg-black text-white text-sm px-4 py-2">
                Save for later
              </Button>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Job;
