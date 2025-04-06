import { Button } from 'antd';
import React from 'react';
import Jobstable from './Jobstable';
import { useNavigate } from 'react-router-dom';
import UseGetAllCompanies from '/src/Costomhooks/UseGetAllCompanies';

const Jobsadmin = () => {
  const navigate = useNavigate();
  UseGetAllCompanies();

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Jobs Dashboard</h1>
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-1 rounded-md"
          >
            Post New Job
          </Button>
        </div>

        <div className="bg-white shadow rounded-md p-4 sm:p-6">
          <Jobstable />
        </div>
      </div>
    </div>
  );
};

export default Jobsadmin;
