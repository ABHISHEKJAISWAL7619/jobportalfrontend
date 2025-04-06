
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setstate } from "../store/UserSlice";

const Login = () => {
  const emailref = useRef();
  const passwordref = useRef();
  const selectref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    const obj = {
      email: emailref.current.value,
      password: passwordref.current.value,
      role: selectref.current.value,
    };

    try {
      const res = await axios.post("https://mernjobportal-wjod.onrender.com/user/login", obj);

      if (res.data.success) {
        dispatch(setstate(res.data));
        toast.success(res.data.msg, {
          position: "bottom-right",
          theme: "dark",
        });
        navigate("/");
      } else {
        toast.error(res.data.msg || "Login failed", {
          position: "top-center",
          theme: "dark",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg || "Something went wrong. Please try again.";
      toast.error(errorMessage, {
        position: "bottom-right",
        theme: "dark",
      });
      console.error("Login error:", error);
    }


  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-400 via-pink-400 to-red-400 p-4">
      <section className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Login to your account
        </h1>

        <form onSubmit={handlesubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              ref={emailref}
              type="email"
              id="email"
              required
              className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              ref={passwordref}
              type="password"
              id="password"
              required
              className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Select Role
            </label>
            <select
              id="role"
              ref={selectref}
              required
              className="mt-1 w-full p-2.5 border border-gray-300 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Choose Role</option>
              <option value="Student">Student</option>
              <option value="Recruiter">Recruiter</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg text-sm transition"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/Signup"
              className="text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Signup here
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Login;

