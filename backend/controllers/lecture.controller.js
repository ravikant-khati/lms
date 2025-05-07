import Course from "../models/course.model.js";
import Lecture from "../models/lecture.model.js";


const createLecture = async (req,res)=>{
    try {
        const {courseID} = req.params;
        const {lectureTitle}= (req.body)
        if(!lectureTitle && !courseID){
            return res.status(400).json({msg:"all fields are required"})
        }
        const course = await Course.findById(courseID)
        if(!course){
            return res.status(400).json({msg:"course not found"})
        }
        const lecture = await Lecture.create({lectureTitle})
        course.lectures.push(lecture._id)
        await course.save()
        return res.status(200).json({msg:"course is created successfully"})
        
    } catch (error) {
        return res.status(500).json({msg:"internal server error. please try again later"})
    }
}
const getCourseAllLectures = async(req, res)=>{
    try {
        const {courseID} = (req.params);
        const course = await Course.findById(courseID).populate("lectures")
        if(!course){
            return res.status(400).json({msg:"course not found"})
        }
        const lectures = course.lectures;
        return res.status(200).json({msg:"all lectures of this course have been given" , lectures})
    } catch (error) {
        return res.status(500).json({msg:"internal server error. please try again later"})
    }
}

export {createLecture  ,getCourseAllLectures}