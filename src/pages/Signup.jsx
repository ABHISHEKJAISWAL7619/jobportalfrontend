import { Label } from "@/components/label";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";
import axios from "axios";
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const nameref = useRef();
  const emailref = useRef();
  const phonenumberref = useRef();
  const passwordref = useRef();
  const selectref = useRef();
  const navigate = useNavigate();
  const imageref = useRef(); 

  const imageUrlRef = useRef('');

  const [photo, setphoto] = useState({ profilePhoto: '' });

  const handlesubmit = async (e) => {
    e.preventDefault();

    const obj = {
      name: nameref.current.value,
      email: emailref.current.value,
      phonenumber: phonenumberref.current.value,
      password: passwordref.current.value,
      role: selectref.current.value,
      profilePhoto: imageUrlRef.current,
    };

    try {
      const res = await axios.post("https://mernjobportal-wjod.onrender.com/user/register", obj);

      if (res.data.success) {
        toast.success(res.data.msg, {
          position: 'bottom-right',
          theme: 'dark'
        });
        navigate('/login');
      } else {
        toast.error(res.data.msg || "Registration failed", {
          position: 'bottom-right',
          theme: 'dark'
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg || "Registration failed. Please try again.";
      toast.error(errorMessage, {
        position: 'bottom-right',
        theme: 'dark'
      });
      console.error("Signup error:", error);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'jobportal');

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/dvpj3v8ds/upload`, formData);
      const data = res.data;
      if (data.secure_url) {
        imageUrlRef.current = data.secure_url;
        toast.success("Image uploaded successfully", {
          position: 'bottom-right',
          theme: 'dark'
        });
      }
    } catch (err) {
      toast.error("Image upload failed", {
        position: 'bottom-right',
        theme: 'dark'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-500 px-4">
      <section className="w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="p-6 space-y-6 sm:p-8">
          <form className="space-y-5" onSubmit={handlesubmit}>
            <div>
              <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Fullname
              </label>
              <input
                ref={nameref}
                type="text"
                name="name"
                id="fullname"
                placeholder="Enter your fullname"
                required
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                ref={emailref}
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                required
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone Number
              </label>
              <input
                ref={phonenumberref}
                type="tel"
                name="phone"
                id="phone"
                placeholder="Enter your phone number"
                required
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                ref={passwordref}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select Role
              </label>
              <select
                ref={selectref}
                id="role"
                required
                className="w-full p-2.5 text-sm rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Recruiter">Recruiter</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <Label htmlFor="file" className="text-sm text-gray-900 dark:text-white">Profile</Label>
              <input
                onChange={handleImage}
                type="file"
                id="file"
                accept="image/*"
                className="w-full cursor-pointer text-sm text-gray-700 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              Create an account
            </button>

            <p className="text-sm font-light text-gray-600 dark:text-gray-400 text-center">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Signup;
