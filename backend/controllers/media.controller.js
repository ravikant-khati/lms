import Lecture from "../models/lecture.model.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

const uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "video file is required" });
    }
    // console.log('file' ,req.file);
    // console.log('body' , req.body);
    const {lectureID} = req.body;
    const lecture = await Lecture.findById(lectureID

    )
    if(lecture && lecture.publicId){
        await cloudinary.uploader.destroy(publicId)
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
    resource_type: "video",
      folder: "lecture-videos",
    });
    console.log(result);
    return res.status(200).json({msg:"video uploaded successfully.", result})
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "internal server error. please try again later" });
  }
};

export { uploadVideo };
