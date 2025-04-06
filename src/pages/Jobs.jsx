import React from "react";
import Filtercard from "/src/components/Filtercard";
import Job from "../components/Job";
import { useSelector } from "react-redux";
import UseGetAllJob from "/src/Costomhooks/UseGetAllJob";

const Jobs = () => {
  UseGetAllJob();

  const jobstore = useSelector((state) => state.AllJob);
  const jobs = jobstore?.allJobs?.jobs || [];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar for Filters */}
          <div className="w-full lg:w-1/4">
            {/* Uncomment Filtercard when ready */}
            {/* <Filtercard /> */}
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            {jobs.length === 0 ? (
              <span className="text-gray-600 text-center block">
                No Jobs Found
              </span>
            ) : (
              <div className="h-[80vh] overflow-y-auto pb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* {jobs.map((job) => (
                    <Job key={job._id} job={job} />
                  ))} */}
                  <Job/>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
