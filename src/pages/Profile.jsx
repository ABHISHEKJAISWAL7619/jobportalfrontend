import React, { useRef, useState } from "react";
import { Avatar, AvatarImage } from "/src/components/avatar";
import { Button } from "/src/components/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "/src/components/badge";
import { Label } from "/src/components/label";
import Appliedjobtable from "/src/components/Appliedjobtable";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Usegetallappliedjobs from "/src/Costomhooks/Usegetallappliedjobs";
import axios from "axios";

const skills = ["mongodb", "Express.js", "React.js", "Node.js"];
const isResume = true;

const Profile = () => {
  
  const nameref = useRef();
  const emailref = useRef();
  const numberref = useRef();
  const bioref = useRef();
  const skillref = useRef();
  const resumeref = useRef();

  Usegetallappliedjobs();
  

  const dispatch = useDispatch();
  const userstore = useSelector((state) => state.user);
  const appliedjobs = useSelector((state) => state.AllJob);
  var token = userstore.token;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleupdate = async (e) => {
    e.preventDefault();

    const data = {
      name: nameref.current.value,
      email: emailref.current.value,
      number: numberref.current.value,
      bio: bioref.current.value,
      skills: skillref.current.value.split(','),
      resume: resumeref.current.value,
    };

    try {
      const res = await axios.put("https://mernjobportal-wjod.onrender.com/user/update", data, {
        headers: {
          Authorization: `${token}`,
        },
      });

      console.log("Updated successfully:", res.data);
     
      setIsModalOpen(false);
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
    
    }
   
  };

  return (
    <div className="max-w-4xl w-full mx-auto bg-white border border-gray-400 rounded-2xl my-5 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <Avatar className="h-24 w-24">
            <AvatarImage src={userstore?.user?.profilePhoto} alt="profile" />
          </Avatar>
          <div>
            <h1 className="font-medium text-xl">{userstore?.user?.name}</h1>
            <p className="text-gray-600 text-sm">
             {userstore?.user?.bio}
            </p>
          </div>
        </div>
        <Button onClick={showModal} variant="outline">
          <Pen />
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Mail />
          <span>{userstore.user.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Contact />
          <span>{userstore.user.phonenumber}</span>
        </div>
      </div>

      <div className="mt-6">
        <h1 className="font-bold text-lg mb-2">Skills</h1>
        <div className="flex flex-wrap gap-2">
          {skills.length > 0 ? (
            skills.map((item, index) => (
              <Badge className="border border-gray" key={index}>
                {item}
              </Badge>
            ))
          ) : (
            <span>Not Applicable</span>
          )}
        </div>
      </div>

      <div className="mt-6 max-w-md">
        <Label className="text-md font-bold">Resume</Label>
        {isResume ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-500 hover:underline mt-1"
            href="https://drive.google.com/file/d/1Grc630KPorr7Bi1EW8pO354b6UwxsTWn/view?usp=drivesdk"
          >
            AbhishekJaiswal.Resume
          </a>
        ) : (
          <span>NA</span>
        )}
      </div>

      <div className="mt-10">
        <h1 className="font-bold text-lg mb-4">Applied Jobs</h1>
        <Appliedjobtable />
      </div>

      <Modal
        getContainer={false}
        title="Update Profile"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form className="flex flex-col gap-4" onSubmit={handleupdate}>
          {[{ ref: nameref, label: "Name", type: "text" },
            { ref: emailref, label: "Email", type: "email" },
            { ref: numberref, label: "Number", type: "text" },
            { ref: bioref, label: "Bio", type: "text" },
            { ref: skillref, label: "Skills", type: "text" }].map((field, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="text-sm font-semibold">{field.label}:</label>
              <input
                ref={field.ref}
                type={field.type}
                className="border border-gray-300 rounded-md px-3 py-1"
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label className="text-sm font-semibold">Resume:</label>
            <input ref={resumeref} type="file" />
          </div>

          <Button type="submit" className="mt-4 bg-blue-600 text-white">
            Update
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;

