import React, { useRef } from "react";
import { Label } from "/src/components/label";
import { Button } from "/src/components/button";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Jobcreate = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = user.token;

  const titleref = useRef();
  const descriptionref = useRef();
  const requirementref = useRef();
  const salaryref = useRef();
  const locationref = useRef();
  const jobtyperef = useRef();
  const experienceref = useRef();
  const positionref = useRef();
  const companyref = useRef();

  const companies = useSelector((state) => state.company);

  const handlepostjob = async (e) => {
    e.preventDefault();

    const data = {
      title: titleref.current.value,
      description: descriptionref.current.value,
      requirements: requirementref.current.value,
      salary: salaryref.current.value,
      location: locationref.current.value,
      jobtype: jobtyperef.current.value,
      experiencelevel: experienceref.current.value,
      position: positionref.current.value,
      companyId: companyref.current.value,
    };

    try {
      const res = await axios.post("https://mernjobportal-wjod.onrender.com/job/postjob", data, {
        headers: {
          Authorization: ` ${token}`,
        },
      });

      if (res.data.success) {
        toast.success(res.data.msg, { position: "bottom-right", theme: "dark" });
        navigate("/admin/jobs");
      }
    } catch (err) {
      toast.error("Job post failed", { position: "bottom-right", theme: "dark" });
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-md shadow-md">
        <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">Post a New Job</h1>
        <form onSubmit={handlepostjob} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Label>Title</Label>
            <input
              ref={titleref}
              type="text"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter job title"
            />
          </div>

          <div>
            <Label>Description</Label>
            <input
              ref={descriptionref}
              type="text"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Job description"
            />
          </div>

          <div>
            <Label>Requirements</Label>
            <input
              ref={requirementref}
              type="text"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Job requirements"
            />
          </div>

          <div>
            <Label>Salary</Label>
            <input
              ref={salaryref}
              type="text"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Salary range"
            />
          </div>

          <div>
            <Label>Location</Label>
            <input
              ref={locationref}
              type="text"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Job location"
            />
          </div>

          <div>
            <Label>Job Type</Label>
            <input
              ref={jobtyperef}
              type="text"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Full-time, Part-time, etc."
            />
          </div>

          <div>
            <Label>Experience Level</Label>
            <input
              ref={experienceref}
              type="text"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Experience level required"
            />
          </div>

          <div>
            <Label>No of Positions</Label>
            <input
              ref={positionref}
              type="text"
              className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              placeholder="Number of positions"
            />
          </div>

          {companies?.companies?.msg?.length > 0 ? (
            <div className="col-span-1 sm:col-span-2">
              <Label>Select Company</Label>
              <select
                ref={companyref}
                className="w-full mt-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
              >
                <option>Select a company</option>
                {companies.companies.msg.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <p className="col-span-1 sm:col-span-2 text-sm text-red-500 text-center">
              No companies available. Please register a company first.
            </p>
          )}

          <div className="col-span-1 sm:col-span-2">
            <Button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-md transition duration-200"
            >
              Post New Job
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Jobcreate;
