import React, { useEffect } from 'react';
// import Job from '../components/Job';
import { useDispatch, useSelector } from 'react-redux';
import UseGetAllJob from '/src/Costomhooks/UseGetAllJob';
import { setsearchjobquery } from '/src/store/JobSlice';
import Job from '/src/components/Job';

const Browse = () => {
  const dispatch = useDispatch();

  // Fetch jobs on mount
  UseGetAllJob();

  useEffect(() => {
    dispatch(setsearchjobquery(""));
  }, [dispatch]);

  const jobstore = useSelector((state) => state.AllJob);
  const userStore = useSelector((state) => state.user);
  const jobs = jobstore?.allJobs?.jobs || [];

  useEffect(() => {
    console.log("Jobstore Jobs:", jobs);
    console.log("User Store:", userStore);
  }, [jobs, userStore]);

  return (
    <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6">
      <h1 className="font-bold text-xl sm:text-2xl mb-6">
        Search Results ({jobs.length})
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs found.</p>
        ) : (
          // jobs.map((job) => (
          //   <Job key={job._id} job={job} />
          // ))
          <Job/>
        )}
      </div>
    </div>
  );
};

export default Browse;
