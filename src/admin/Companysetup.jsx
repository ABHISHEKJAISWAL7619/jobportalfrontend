import { Button } from "antd";
import { ArrowLeft } from "lucide-react";
import React, { useRef } from "react";
import { Label } from "/src/components/label";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Companysetup = () => {
  const nameref = useRef();
  const descriptionref = useRef();
  const websiteref = useRef();
  const locationref = useRef();
  // const logoref = useRef();

  const navigate = useNavigate();
  const companyid = useSelector((state) => state.company.singleCompany);

  const handleupdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", nameref.current.value);
    formData.append("description", descriptionref.current.value);
    formData.append("website", websiteref.current.value);
    formData.append("location", locationref.current.value);
    // formData.append("logo", logoref.current.files[0]);

    try {
      const res = await axios.put(
        `https://mernjobportal-wjod.onrender.com/company/update/${companyid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.msg, {
          position: "bottom-right",
          theme: "dark",
        });
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error("Update failed", { position: "bottom-right" });
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <Button
            onClick={() => navigate("/admin/companies")}
            className="flex items-center gap-2 text-gray-600"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="text-xl font-semibold">Company Setup</h1>
        </div>

        <form onSubmit={handleupdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Company Name</Label>
              <input
                ref={nameref}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                type="text"
                name="name"
              />
            </div>
            <div>
              <Label>Description</Label>
              <input
                ref={descriptionref}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                type="text"
                name="description"
              />
            </div>
            <div>
              <Label>Website</Label>
              <input
                ref={websiteref}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                type="text"
                name="website"
              />
            </div>
            <div>
              <Label>Location</Label>
              <input
                ref={locationref}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                type="text"
                name="location"
              />
            </div>
            {/* <div className="md:col-span-2">
              <Label>Logo</Label>
              <input
                ref={logoref}
                type="file"
                accept="image/*"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div> */}
          </div>

          <Button
            htmlType="submit"
            className="w-full bg-blue-500 text-white font-semibold rounded-md py-2"
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Companysetup;
