import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useCreateLectureMutation,
  useGetAllLecturesQuery,
} from "../../../features/apis/lectureAPI";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const { courseID } = useParams();
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState("");
  const [createLecture, { data, isLoading, isError, isSuccess }] =
    useCreateLectureMutation();
  const {
    data: lectureData,
    isLoading: lectureIsLoading,
    isSuccess: lectureIsSuccess,
    isError: lectureIsError,
    refetch
  } = useGetAllLecturesQuery(courseID);
  function handleTitleChange(e) {
    setLectureTitle(e.target.value);
  }
  function handleSubmit() {
    createLecture({ courseID, lectureTitle });
  }
  useEffect(() => {
    if (isSuccess) {
      refetch()
      toast.success("lecture created successfully");
    }
    if (isError) {
      toast.error("failed to create lecture");
    }
  }, [isSuccess, isError]);
  useEffect(() => {
    if (lectureData) {
      console.log(lectureData);
      console.log(lectureData.lectures);
    }
  }, [lectureData]);
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add lectures, add some basic details for your new lecture
        </h1>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
          laborum!
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="lectureTitle"
            value={lectureTitle}
            onChange={handleTitleChange}
            placeholder="Your Title Name"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() =>
              navigate(`/admin/course/edit/${courseID}/add-lecture`)
            }
          >
            Back to course
          </Button>
          <Button onClick={handleSubmit}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create lecture"
            )}
          </Button>
        </div>
      </div>
      <div className="mt-5">
        {lectureIsLoading ? (
          <p>loading...</p>
        ) : lectureIsError ? (
          <p>can't get lectures</p>
        ) : lectureData.lectures.length === 0 ? (
          <p>no lectures created</p>
        ) : (
          lectureData.lectures.map((l, i) => {
            return <Lecture lecture={l} index={i} courseID={courseID} />
        })
        )}
      </div>
    </div>
  );
};

export default CreateLecture;
