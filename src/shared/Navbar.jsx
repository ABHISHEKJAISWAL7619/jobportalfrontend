import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/UserSlice";

import { Popover, PopoverTrigger, PopoverContent } from "/src/components/popover";
import { Button } from "/src/components/button";
import { Avatar, AvatarImage, AvatarFallback } from "/src/components/avatar";
import { LogOut, User2 } from "lucide-react";

export default function Navbar() {
  const userstore = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const user = userstore.user;
  console.log(user)

  return (
    <nav className="bg-yellow-200">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user ? (
              user.role === "Recruiter" ? (
                <>
                  <Link to={"/admin/companies"}>Companies</Link>
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </>
              ) : (
                <>
                  <Link to={"/"}>Home</Link>
                  <Link to={"/Jobs"}>Jobs</Link>
                  <Link to={"/Browse"}>Browse</Link>
                </>
              )
            ) : null}
          </ul>

          {!user ? (
            <div className="flex gap-3">
              <Link to={"/Login"}>
                <Button variant="outline" className="cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link to={"/Signup"}>
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] cursor-pointer text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={userstore?.user?.profilePhoto}
                    alt={userstore?.user?.name || "User"}
                  />
                  <AvatarFallback>
                    {userstore?.user?.name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-max bg-white">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={userstore?.user?.profilePhoto}
                      alt={userstore?.user?.name || "User"}
                    />
                    <AvatarFallback>
                      {userstore?.user?.name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold">{userstore?.user?.name}</h4>
                    <h6>Lorem ipsum dolor sit amet</h6>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  {user && user.role === "Student" && (
                    <div className="flex gap-3 items-center">
                      <User2 />
                      <Link to={"/Profile"}>
                        <button className="outline-none font-bold cursor-pointer">
                          View profile
                        </button>
                      </Link>
                    </div>
                  )}
                  <div className="flex gap-3 items-center">
                    <LogOut />
                    <Link
                      onClick={() => dispatch(logout())}
                      className="outline-none font-bold cursor-pointer"
                    >
                      Log Out
                    </Link>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </nav>
  );
}
