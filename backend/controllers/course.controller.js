import Course from "../models/course.model.js";
import cloudinary from "../utils/cloudinary.js";
import fs from 'fs'

const getAllCoursesForAdmin = async (req, res) => {
  try {
    const adminId = req.userId;
    // console.log(adminId);
    const courses = await Course.find({ creator: adminId });
    if (!courses || courses.length === 0) {
      return res.status(200).json({ msg: "admin have no course" });
    }
    return res
      .status(200)
      .json({ msg: "all courses of admin fetched successfully", courses });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "internal server error. please try again after some time" });
  }
};
const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({ msg: "all fields are required" });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.userId,
    });
    res.json({ msg: "course created successfully", course });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "internal server error. please try again after some time" });
  }
};
const editCourse = async (req, res)=>{
  try {
    const {courseTitle , subTitle , description , courseLevel , coursePrice , category} = req.body;
    const courseID = req.params.courseID;
    const file = req.file;

    const course = await Course.findById(courseID)
    if(!course){
      return res.status(400).json({msg:"course not found"})
    }
    if(course.courseThumbnail){
      const publicId = course.courseThumbnail.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId)
    }
    const result = await cloudinary.uploader.upload(file.path)
    console.log("old course" , course)
    const updatedCourse = {
      ...course.toObject() , 
      courseTitle,subTitle , description , courseLevel , coursePrice , category,courseThumbnail:result.secure_url,coursePrice
    }
    console.log("edited course",updatedCourse)
    const updatedCourseFromBackend = await Course.findByIdAndUpdate(courseID ,updatedCourse , {new:true

    } )
    fs.unlinkSync(file.path)
    console.log("update course" , updatedCourseFromBackend);
    res.status(200).json({msg:"course updated successfully"}, updatedCourseFromBackend)
  } catch (error) {
    console.log(error);
  }
}
const getCourse = async (req,res)=> {
  try {
    const {courseID} = req.params;
    const course = await Course.findById(courseID)
    if(!course){
      return res.status(400).json({msg:"course not found"})
    }
    return res.status(200).json({msg:"course found" , course})
    
  } catch (error) {
    return res.status(500).json({msg:"internal server error. please try again later"})
  }

}
export { getAllCoursesForAdmin, createCourse , editCourse, getCourse };
