import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllCoursesForAdminQuery } from "../../../features/apis/courseAPI";

const CourseTable = () => {
  const navigate = useNavigate();
  const { isSuccess, data, isLoading, isError, refetch } =
    useGetAllCoursesForAdminQuery();
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, [isSuccess, isError]);
  useEffect(() => {
    refetch();
  }, []);
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div>
      <Button onClick={() => navigate("add-course")}>
        Create a new course
      </Button>
      <Table>
        <TableCaption>A list of your all courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>

            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.courses.map((course) => (
            <TableRow>
              <TableCell className="font-medium">
                {course?.coursePrice || "NA"}
              </TableCell>
              <TableCell>
                {" "}
                <Badge>{course.isPublished ? "Published" : "Draft"}</Badge>{" "}
              </TableCell>
              <TableCell>{course.courseTitle}</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" onClick={()=>(navigate(`/admin/course/edit/${course._id}`))}>
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
