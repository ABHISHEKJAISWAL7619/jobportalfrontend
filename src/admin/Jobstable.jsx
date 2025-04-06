import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import React from "react";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "/src/components/table";
import { Popover } from "/src/components/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { PopoverTrigger } from "/src/components/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UseGetAllJob from "/src/Costomhooks/UseGetAllJob";

const Jobstable = () => {
  const navigate = useNavigate();

  UseGetAllJob();

  const alljobs = useSelector((state) => state.AllJob);
  const jobs = alljobs?.allJobs?.jobs || [];

  return (
    <div className="overflow-x-auto rounded-md shadow-sm border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-sm text-left">
        <TableCaption className="text-base font-semibold text-gray-700 p-4">
          A list of your recent posted jobs
        </TableCaption>

        <TableHeader className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
          <TableRow>
            <TableHead className="px-4 py-2">Title</TableHead>
            <TableHead className="px-4 py-2">Company</TableHead>
            <TableHead className="px-4 py-2">Date</TableHead>
            <TableHead className="px-4 py-2 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                No jobs available.
              </TableCell>
            </TableRow>
          ) : (
            jobs.map((item) => (
              <TableRow key={item._id} className="hover:bg-gray-50 transition">
                <TableCell className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.title}
                </TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap text-gray-700">
                  {item.company?.name || "No company"}
                </TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-4 py-3 text-right">
                  <Popover>
                    <PopoverTrigger className="focus:outline-none">
                      <MoreHorizontal className="w-5 text-gray-600 hover:text-gray-800" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36 bg-white border border-gray-300 rounded shadow-lg p-2">
                      <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/${item._id}`)}
                        className="flex items-center gap-2 cursor-pointer mt-2 hover:text-blue-600 transition"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </table>
    </div>
  );
};

export default Jobstable;
