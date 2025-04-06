
import { Edit2, MoreHorizontal } from "lucide-react";
import React from "react";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "/src/components/table";
import { Avatar } from "../components/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Popover } from "/src/components/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { PopoverTrigger } from "/src/components/popover";
import UseGetAllCompanies from "/src/Costomhooks/UseGetAllCompanies";
import { useSelector } from "react-redux";

const Companiestable = () => {
  UseGetAllCompanies(); // fetch companies

  const companies = useSelector((state) => state.company);
  console.log(companies)
  const companyList = companies?.companies?.msg || [];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <TableCaption className="font-bold">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companyList.length > 0 ? (
            companyList.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="w-1/12 sm:w-1/10 md:w-1/12">
                  <Avatar >
                    <AvatarImage  src={item?.logo} />
                  </Avatar>
                </TableCell>
                <TableCell className="w-3/12 sm:w-2/12 md:w-2/12">
                  {item.name}
                </TableCell>
                <TableCell className="w-2/12 sm:w-3/12 md:w-3/12">
                  {item.createdAt}
                </TableCell>
                <TableCell className="w-1/12 sm:w-2/12 md:w-2/12 text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="w-5" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No companies found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </table>
    </div>
  );
};

export default Companiestable;
