import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = () => {
   
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
      <Link
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      >
        <img
          
          alt="course-thumbnial"
          className="h-32 w-full md:w-56 object-cover rounded"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl">courseTitle</h1>
          <p className="text-sm text-gray-600">subTitle</p>
          <p className="text-sm text-gray-700">
            Intructor: <span className="font-bold">creator name</span>{" "}
          </p>
          <Badge className="w-fit mt-2 md:mt-0">courseLevel</Badge>
        </div>
      </Link>
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-lg md:text-xl">₹coursePrice</h1>
      </div>
    </div>
  );
};

export default SearchResult;