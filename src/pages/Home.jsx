  import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../components/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "/src/components/carousel";
import { CarouselNext, CarouselPrevious } from "/src/components/carousel";
import LatestJobcards from "./LatestJobcards";
import { useDispatch, useSelector } from "react-redux";
import UseGetAllJob from "/src/Costomhooks/UseGetAllJob";
import { useNavigate } from "react-router-dom";
import { setsearchjobquery } from "/src/store/JobSlice";

const Home = () => {
  const dispatch = useDispatch();
 const [query , setquery] = useState("");

 const searchjobhandler = (e)=>{
  e.preventDefault();
  dispatch(setsearchjobquery(query))
  navigate("/Browse")

 }
 const crouseljobhandler = (e)=>{
  e.preventDefault();
  dispatch(setsearchjobquery(query))
  navigate("/Browse")

 }






  const navigate = useNavigate();
  useEffect(() => {
    if (userstore.user?.role == "Recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  UseGetAllJob();

  const Jobstore = useSelector((state) => state.AllJob);
  console.log(Jobstore.allJobs.jobs);

  let userstore = useSelector((state) => state.user);
  console.log(userstore);

  const category = [
    "Frontend Developer",
    " Backend Developer",
    "Fullstack Developer",
    "Data Science Engineering",
    "DevOps Engineering",
  ];

  return (
    <div>
      <div className="flex flex-col gap-5 my-10">
        <div className="text-center">
          <span className="px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
            Best Job Hund website
          </span>
          <h1 className="text-5xl font-bold">
            Search, Apply & <br />
            Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
          </h1>
          <p className="mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            totam, labore quisquam, soluta corporis{" "}
          </p>
          <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3  items-center gap-4 mx-auto rounded-full">
            <input
            onChange={(e)=>setquery(e.target.value)}
              type="text"
              placeholder="Find Your Dream Job"
              className="outline-none border-none w-full h-8  "
            />
            <Button  onClick={searchjobhandler}
             className=" w-8 h-8 bg-[#6A38C2] rounded-r-full">
              <Search className=" rounded-r-full bg-[#6A38C2] " />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Carousel className="w-full max-w-xl mx-auto my-20">
          <CarouselContent>
            {category.map((cat, index) => (
              <CarouselItem
                key={index} // Make sure to include a unique key for each item
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <Button  onClick={crouseljobhandler}  variant="outline" className="rounded-full">
                  {cat}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="max-w-7xl mx-auto my-20">
        <h1 className="text-4xl font-bold">
          <span className="text-[#6A38C2]">Latest & Top</span> Job Opening
        </h1>
        <div className="grid grid-cols-3 gap-4 my-5 ">
          <LatestJobcards />
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center">
            {/* Logo Section */}
            <div className="text-2xl font-semibold">
              <a href="/" className="text-white hover:text-indigo-500">
                JobPortal
              </a>
            </div>

            {/* Links Section */}
            <div className="flex space-x-6">
              <a href="/about" className="hover:text-indigo-500">
                About Us
              </a>
              <a href="/contact" className="hover:text-indigo-500">
                Contact
              </a>
              <a href="/privacy" className="hover:text-indigo-500">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-indigo-500">
                Terms & Conditions
              </a>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-700 pt-6 text-center text-sm">
            <p>&copy; 2025 JobPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;