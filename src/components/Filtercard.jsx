import React from 'react';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Label } from './label';

const filterdata = [
  {
    filtertype: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filtertype: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
  },
  {
    filtertype: "Salary",
    array: ["0-40k", "42-90k", "90k-150k"]
  },
];

const Filtercard = () => {
  return (
    <div className="w-full p-3 sm:p-5 rounded-md bg-white shadow-sm">
      <h1 className="font-bold text-base sm:text-lg">Filter Jobs</h1>
      <hr className="mt-3 mb-4" />
      
      <RadioGroup className="space-y-6">
        {filterdata.map((data, index) => (
          <div key={index}>
            <h2 className="mb-3 font-semibold text-sm sm:text-base">{data.filtertype}</h2>
            <div className="space-y-2">
              {data.array.map((item, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <RadioGroupItem value={item} id={`${data.filtertype}-${item}`} />
                  <Label htmlFor={`${data.filtertype}-${item}`} className="text-sm sm:text-base">{item}</Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Filtercard;
