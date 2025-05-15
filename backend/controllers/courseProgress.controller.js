import Course from "../models/course.model.js";
import Progress from "../models/courseProgress.model.js";

const getCourseProgress = async (req, res) => {
  try {
    const userID = req.userId;
    const { courseID } = req.params;
    if (!userID || !courseID) {
      return res
        .status(400)
        .json({ msg: "user id and course id both are required" });
    }
    const courseDetails = await Course.findById(courseID).populate({
      path: "lectures",
    });
    if (!courseDetails) {
      return res.status(400).json({ msg: "course not found" });
    }
    const courseProgress = await Progress.findOne({ userID, courseID });
    if (!courseProgress) {
      return res.status(200).json({ courseDetails, courseProgress: {} });
    }
    return res.status(200).json({ courseDetails, courseProgress });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "internal server error. please try again after some time" });
  }
};
const updateCourseProgress = async (req, res) => {
  try {
    const { courseID, lectureID } = req.body;
    const userID = req.userId;
    if (!courseID || !userID || !lectureID) {
      return res
        .status(400)
        .json({ msg: "user id and course id and lecture id are required" });
    }
    console.log(courseID, userID, lectureID);
    let updatedProgress = await Progress.findOneAndUpdate(
      {
        courseID,
        userID,
      },
      {
        $push: { lectureProgress: { lectureID, viewed: true } },
      },
      { new: true }
    );
    if(!updatedProgress){
         updatedProgress  = await Progress.create({
            courseID,userID,
             lectureProgress:{
                lectureID,
                viewed:true
             }
         })
    }
    return res.status(200).json({msg:"coruse updated" , updatedProgress})
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "internal server error. please try again after some time" });
  }
};
export { getCourseProgress, updateCourseProgress };
