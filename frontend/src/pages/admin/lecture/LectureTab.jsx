import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUploadVideoMutation } from "../../../features/apis/mediaAPI";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteLectureMutation,
  useGetLectureQuery,
  useUpdateLectureMutation,
} from "../../../features/apis/lectureAPI";

const LectureTab = () => {
  const navigate = useNavigate()
  const { courseID, lectureID } = useParams();
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureVideoInfo, setLectureVideoInfo] = useState({});
  const [isPreviewFree, setIsPreviewFree] = useState(false);

const {data:lectureData , isLoading:lectureIsLoading , isSuccess:lectureIsSuccess, isError:lectureIsError} = useGetLectureQuery(lectureID)

  const [
    uploadVideo,
    {
      data: lectureVideoData,
      isLoading: lectureVideoIsLoading,
      isError: lectureVideoIsError,
      isSuccess: lectureVideoIsSuccess,
    },
  ] = useUploadVideoMutation();

  const [updateLecture, { data, isLoading, isSuccess, isError }] =
    useUpdateLectureMutation();

  const [
    deleteLecture,
    {
      isLoading: deleteIsLoading,
      isSuccess: deleteIsSuccess,
      isError: deleteIsError,
    },
  ] = useDeleteLectureMutation();

  async function handleVideoUpload(e) {
    const formData = new FormData();
    formData.append("lectureVideo", e.target.files[0]);
    formData.append('lectureID' , lectureID)
    await uploadVideo(formData);
  }

  async function handleUpdateLectureSubmit() {
    await updateLecture({
      courseID,
      lectureID,
      lectureTitle,
      lectureVideoInfo,
      isPreviewFree,
    });
  }

  async function handleLectureDelete() {
    await deleteLecture({ courseID, lectureID });
  }

  useEffect(() => {
    if (lectureVideoIsSuccess) {
      setLectureVideoInfo(lectureVideoData.result);
      toast.success("video uploaded");
    }
    if (lectureVideoIsError) {
      toast.error("failed to upload video");
    }
  }, [lectureVideoIsSuccess, lectureVideoIsError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("lecture updated");
    }
    if (isError) {
      toast.error("failed to upadate lecture");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (deleteIsSuccess) {
      toast.success("lecture deleted");
      navigate(`/admin/course/edit/${courseID}/add-lecture`)
    }
    if (deleteIsError) {
      toast.error("failed to delete lecture");
    }
  }, [deleteIsSuccess, deleteIsError]);

  useEffect(()=>{
    if(lectureIsSuccess){
      setLectureTitle(lectureData.lecture.lectureTitle)
      setIsPreviewFree(lectureData.lecture.isPreviewFree)
    }
  },[lectureIsSuccess])

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="destructive" onClick={handleLectureDelete}>
            {deleteIsLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Ex. Introduction to Javascript"
          />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            placeholder="Ex. Introduction to Javascript"
            className="w-fit"
          />
        </div>
        <div>{lectureVideoIsLoading && <p>upload kar rha hu</p>}</div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
            id="isPreviewFree"
            checked={isPreviewFree}
            onCheckedChange={() => setIsPreviewFree(!isPreviewFree)}
          />
          <Label htmlFor="isPreviewFree">Is this video FREE</Label>
        </div>

        <div className="mt-4">
          <Button
            disabled={lectureVideoIsLoading}
            onClick={handleUpdateLectureSubmit}
          >
            {false ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
