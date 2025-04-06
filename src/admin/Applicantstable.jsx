import React from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "/src/components/table";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "/src/components/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Applicantstable = () => {
  const Jobid = useParams();
  const applicants = useSelector((state) => state.application);
  const applicantList = applicants?.applications?.applications || [];

  const handleupdatestatus = async (id, status) => {
    const obj = { status };
    try {
      const res = await axios.put(`https://mernjobportal-wjod.onrender.com/application/updatestatus/${id}`, obj);


 if (res.data.success) {
        toast.success(res.data.msg, {
          position: 'bottom-right',
          theme: 'dark'
        });
      }


      
      console.log("Status update success:", res.data);
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[800px]">
        <TableCaption>A List of Your Recently Applied Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicantList.length > 0 ? (
            applicantList.map((item, index) => {
              const applicant = item.applicant || {};
              return (
                <TableRow key={index}>
                  <TableCell>{applicant.name || "N/A"}</TableCell>
                  <TableCell>{applicant.email || "N/A"}</TableCell>
                  <TableCell>{applicant.phonenumber || "N/A"}</TableCell>
                  <TableCell>
                    {applicant.resumeUrl ? (
                      <a
                        href={applicant.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    <select
                      defaultValue=""
                      onChange={(e) => handleupdatestatus(item._id, e.target.value)}
                      className="border p-1 rounded"
                    >
                      <option value="" disabled>Select status</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Applicantstable;
