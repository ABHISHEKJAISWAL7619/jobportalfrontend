import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Badge } from "./badge";
import { useSelector } from "react-redux";

const Appliedjobtable = () => {
  const appliedjobs = useSelector((state) => state.AllJob);
  const Allappliedjobs = appliedjobs?.allappliedjobs?.application || [];

  return (
    <div className="overflow-x-auto rounded-md shadow-sm border border-gray-200 mt-6">
      <Table className="min-w-full text-sm">
        <TableCaption className="text-base font-semibold text-gray-700 p-4">
          A list of your applied jobs
        </TableCaption>
        <TableHeader className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider">
          <TableRow>
            <TableHead className="px-4 py-2">Date</TableHead>
            <TableHead className="px-4 py-2">Job Role</TableHead>
            <TableHead className="px-4 py-2">Company</TableHead>
            <TableHead className="px-4 py-2 text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Allappliedjobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                You have not applied to any jobs.
              </TableCell>
            </TableRow>
          ) : (
            Allappliedjobs.map((item) => (
              <TableRow key={item._id} className="hover:bg-gray-50 transition">
                <TableCell className="px-4 py-3 whitespace-nowrap text-gray-700">
                  {item?.createdAt?.split("T")[0] || "N/A"}
                </TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap text-gray-900 font-medium">
                  {item?.job?.title || "N/A"}
                </TableCell>
                <TableCell className="px-4 py-3 whitespace-nowrap text-gray-700">
                  {item?.company?.name || "N/A"}
                </TableCell>
                <TableCell className="px-4 py-3 text-right">
                  <Badge className="border border-gray-400">
                    {item?.status || "Pending"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Appliedjobtable;
