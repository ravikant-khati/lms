import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import BuyCourseButton from "../../components/BuyCourseButton";

import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCourseDetailWithStatusQuery } from "../../features/apis/coursePurchaseAPI";
import { useEffect } from "react";

const CourseDetail = () => {
  const {courseID} = useParams()
  const navigate = useNavigate()
  const {data:res, isSuccess , isLoading , isError} = useGetCourseDetailWithStatusQuery(courseID)
  useEffect(()=>{
    if(isSuccess){
      console.log(res);
    }
  },[isSuccess , isError])
  if(isLoading) return <h1 className="mt-20">Loading... please wait</h1>
  return (
    <div className="space-y-5">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
           {res.course.courseTitle}
          </h1>
          <p className="text-base md:text-lg">{res.course.subTitle}</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic">
              {res.course.creator.username}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {(res.course.updatedAt.split('T')[0])}</p>
          </div>
          <p>Students enrolled:{res.course.enrolledStudents.length}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm" dangerouslySetInnerHTML={{__html:res.course.description}}
          />
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>{res.course.lectures.length} lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {res.course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {lecture.isPreviewFree ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height={"100%"}
                  controls={true}
                  url={res.course.lectures[0].videoUrl}
                />
              </div>
              <h1>{res.course.lectures[0].lectureTitle}</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">{res.course.coursePrice}</h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {res.purchaseStatus ? (
                <Button onClick={()=>navigate(`/course-progress/${courseID}`)} className="w-full">Continue Course</Button>
              ) : (
                <BuyCourseButton courseID={courseID} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;