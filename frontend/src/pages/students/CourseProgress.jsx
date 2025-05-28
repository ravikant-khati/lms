import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import {
  useGetCourseProgressQuery,
  useUpdateCourseProgressMutation,
} from "../../features/apis/progressAPI";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const CourseProgress = () => {
  const { courseID } = useParams();
  const { data, isLoading, isSuccess, isError } =
    useGetCourseProgressQuery(courseID);
  const [
    updateCourseProgress,
    {
      data: updateData,
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      isError: updateIsError,
    },
  ] = useUpdateCourseProgressMutation();
  const [currentLecture, setCurrentLecture] = useState(
    data?.courseDetails.lectures[0]
  );
  const [areAllLecturesViewed, setAreAllLecturesViewed] = useState(false);
  const handleOnEndedLecture = () => {
    updateCourseProgress({ courseID, lectureID: currentLecture._id });
  };
  const handleIsViewed = (id) => {
    return data.courseProgress?.lectureProgress?.some(
      (lec) => lec.lectureID === id && lec.viewed === true
    );
  };
  const checkForCompletion = ({ courseDetails, courseProgress }) => {
    const attendedLecture = courseProgress?.lectureProgress?.filter(
      (lec) => lec.viewed === true
    );
    console.log( "attended",attendedLecture);
    console.log("all",courseDetails.lectures);
    setAreAllLecturesViewed( attendedLecture?.length === courseDetails?.lectures?.length
      ? true
      : false)
  };
  useEffect(() => {
    if (isSuccess) {
      setCurrentLecture(data.courseDetails.lectures[0]);
      checkForCompletion(data);
    }
    console.log("on load data", data);
  }, [isSuccess]);
  useEffect(() => {
    if (updateIsSuccess) {
      console.log(updateData);
    }
  }, [updateIsSuccess]);
  if (isLoading) return <h1>Loading...</h1>;
  const { courseDetails, courseProgress } = data;
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseDetails.courseTitle}</h1>
        <Button>
          {false ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>{" "}
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video section  */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            <video
              controls
              className="w-full h-auto md:rounded-lg"
              src={currentLecture?.videoUrl}
              onEnded={handleOnEndedLecture}
            />
          </div>
          {/* Display current watching lecture title */}
          <div className="mt-2 ">
            <h3 className="font-medium text-lg">
              {currentLecture?.lectureTitle}
            </h3>
          </div>
          <div>
            {areAllLecturesViewed?'You Have Completed The Course' :'not viewed'}
          </div>
        </div>
        {/* Lecture Sidebar  */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {courseDetails.lectures.map((lecture) => (
              <Card
                onClick={() => setCurrentLecture(lecture)}
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-200 dark:dark:bg-gray-800"
                    : ""
                } `}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {handleIsViewed(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {handleIsViewed(lecture._id) && (
                    <Badge
                      variant={"outline"}
                      className="bg-green-200 text-green-600"
                    >
                      Viewed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
