import { Button } from "@/components/ui/button";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  const navigate = useNavigate()
  const {courseID} = useParams()
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">
          Add detail information regarding course
        </h1>
        
          <Button className="hover:text-blue-600" variant="link" onClick={()=>navigate(`/admin/course/edit/${courseID}/add-lecture`)}>Go to lectures page</Button>
        
      </div>
      <CourseTab/>
    </div>
  );
};

export default EditCourse;