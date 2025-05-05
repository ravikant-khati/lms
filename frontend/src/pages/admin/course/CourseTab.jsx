// import RichTextEditor from "@/components/RichTextEditor";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import RichTextEditor from "../../../components/RichTextEditor";
import { useEditCourseMutation, useGetCourseQuery } from "../../../features/apis/courseAPI";

const CourseTab = () => {
  const [editCourse , {data , isLoading , isError , isSuccess}] = useEditCourseMutation()
  const [inputValues , setInputValues]= useState({
    courseTitle:"",
    subTitle:"",
    description:"",
    courseLevel:"",
    coursePrice:Number,
    courseThumbnail:"",
    category:''

  })
  const [previewThumbnail , setPreviewThumbnail] = useState('')
  const {courseID} = useParams()
  const {data:singleCourseData , isLoading:singleCourseIsLoading } = useGetCourseQuery(courseID)
  const handleInuptValuesChange=(e)=>{
    setInputValues({...inputValues , [e.target.name]:e.target.value})

  }
  function handleCategorySelector(value){
    setInputValues({...inputValues , category:value})
  }
  function handleLevelSelector(value){
    setInputValues({...inputValues , courseLevel:value})
  }
  function handleFileInput(e){
    // console.log(e.target.files[0]);
    setInputValues({...inputValues , courseThumbnail:e.target.files[0]})
    const fileReader = new FileReader()
    fileReader.onloadend = ()=>{
      return setPreviewThumbnail(fileReader.result)
    }
    fileReader.readAsDataURL(e.target.files[0])
  }
  const handleEditCourseSubmit= async ()=>{
    const formData = new FormData();
    formData.append("courseTitle" , inputValues.courseTitle)
    formData.append("subTitle" , inputValues.subTitle)
    formData.append('description', inputValues.description)
    formData.append('courseLevel', inputValues.courseLevel)
    formData.append('coursePrice', inputValues.coursePrice)
    formData.append("courseThumbnail" , inputValues.courseThumbnail)
    formData.append('category' , inputValues.category)
    await editCourse({formData , courseID})

    }
    useEffect(()=>{
      if(isSuccess){
        toast.success("course edited successfully in backend")
      }
      if(isError){
        toast.error("couldn't update the course")
      }
      if(singleCourseData.course){
        setInputValues(singleCourseData.course)
      }
    },[isSuccess , isError , singleCourseData])
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button
            // disabled={courseByIdData?.course.lectures.length === 0}
            variant="outline"
          >
            {true ? "Unpublished" : "Publish"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={inputValues.courseTitle}
              onChange={handleInuptValuesChange}
              placeholder="Ex. Fullstack developer"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={inputValues.subTitle}
              onChange={handleInuptValuesChange}
              placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor inputValues = {inputValues} setInputValues={setInputValues}/>
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select onValueChange={handleCategorySelector}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Next JS">Next JS</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Frontend Development">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="Fullstack Development">
                      Fullstack Development
                    </SelectItem>
                    <SelectItem value="MERN Stack Development">
                      MERN Stack Development
                    </SelectItem>
                    <SelectItem value="Javascript">Javascript</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Docker">Docker</SelectItem>
                    <SelectItem value="MongoDB">MongoDB</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select onValueChange={handleLevelSelector}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={inputValues.coursePrice}
                onChange={handleInuptValuesChange}
                placeholder="199"
                className="w-fit"
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input type="file" accept="image/*" className="w-fit" onChange={handleFileInput} />
            {previewThumbnail && (<img src={previewThumbnail} alt="thumbnail preview" className="w-60" />)}
          </div>
          <div>
            <Button onClick={() => navigate("/admin/course")} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleEditCourseSubmit}>
              {false ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
