import Course from "../models/course.model.js";
import Lecture from "../models/lecture.model.js";
import cloudinary from "../utils/cloudinary.js";

const createLecture = async (req, res) => {
  try {
    const { courseID } = req.params;
    const { lectureTitle } = req.body;
    if (!lectureTitle && !courseID) {
      return res.status(400).json({ msg: "all fields are required" });
    }
    const course = await Course.findById(courseID);
    if (!course) {
      return res.status(400).json({ msg: "course not found" });
    }
    const lecture = await Lecture.create({ lectureTitle });
    course.lectures.push(lecture._id);
    await course.save();
    return res.status(200).json({ msg: "course is created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "internal server error. please try again later" });
  }
};
const getCourseAllLectures = async (req, res) => {
  try {
    const { courseID } = req.params;
    const course = await Course.findById(courseID).populate("lectures");
    if (!course) {
      return res.status(400).json({ msg: "course not found" });
    }
    const lectures = course.lectures;
    return res
      .status(200)
      .json({ msg: "all lectures of this course have been given", lectures });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "internal server error. please try again later" });
  }
};
const getLecture = async (req,res)=>{
    try {
        const {lectureID} = req.params;
        const lecture =  await Lecture.findById(lectureID)
        if(!lecture){
            return res.status(400).json({msg:"lecture not found"})
        }
        return res.status(200).json({msg:"lecture found" , lecture})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"internal server error.please try again later"})
    }
}
const editLecture = async (req, res) => {
  try {
    const {lectureID } = req.params;
    const { lectureTitle, lectureVideoInfo, isPreviewFree } = req.body;
    const lecture = await Lecture.findById(lectureID);
    if (!lecture) return res.status(400).json({ msg: "lecture not found" });
    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (lectureVideoInfo) lecture.videoUrl = lectureVideoInfo.url;
    if (lectureVideoInfo) lecture.publicId = lectureVideoInfo.public_id;
    if (isPreviewFree) lecture.isPreviewFree = isPreviewFree;
    await lecture.save();

    return res.end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "internal server error. please try again later" });
  }
};
const deleteLecture = async (req, res) => {
  try {
    const { lectureID, courseID } = req.params;
    const course = await Course.findById(courseID);
    if (!course) {
      return res.status(400).json({ msg: "course not found" });
    }
     const lecture = await Lecture.findByIdAndDelete(lectureID);
    await Course.updateOne(
      { lectures: lectureID },
      { $pull: { lectures: lectureID } }
    );
    if(lecture.publicId){

        await cloudinary.uploader.destroy(publicId)
    }
    return res.status(200).json({ msg: "lecture deleted successfully" });
  } catch (error) {
    console.log(error);
    return resres
      .status(500)
      .json({ msg: "internal server error. please try again later" });
  }
};
export { createLecture, getCourseAllLectures, editLecture, deleteLecture , getLecture };
