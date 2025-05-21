import Course from "../models/course.model.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
import User from "../models/user.model.js";
import queryGenerator from "../utils/generateQuery.js";

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
const editCourse = async (req, res) => {
  try {
    const {
      courseTitle,
      subTitle,
      description,
      courseLevel,
      coursePrice,
      category,
    } = req.body;
    const courseID = req.params.courseID;
    const file = req.file;

    const course = await Course.findById(courseID);
    if (!course) {
      return res.status(400).json({ msg: "course not found" });
    }
    let courseThumbnail = course.courseThumbnail;
    if (req.file) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }
      const result = await cloudinary.uploader.upload(file.path);
      courseThumbnail = result.secure_url;
    }
    console.log("old course", course);
    const updatedCourse = {
      ...course.toObject(),
      courseTitle,
      subTitle,
      description,
      courseLevel,
      coursePrice,
      category,
      courseThumbnail,
      coursePrice,
    };
    const updatedCourseFromBackend = await Course.findByIdAndUpdate(
      courseID,
      updatedCourse,
      { new: true }
    );
    fs.unlinkSync(file.path);
    res
      .status(200)
      .json({ msg: "course updated successfully" }, updatedCourseFromBackend);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "internal server error. please try again later" });
  }
};
const getCourse = async (req, res) => {
  try {
    const { courseID } = req.params;
    const course = await Course.findById(courseID);
    if (!course) {
      return res.status(400).json({ msg: "course not found" });
    }
    return res.status(200).json({ msg: "course found", course });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "internal server error. please try again later" });
  }
};

const publishUnpublishCourse = async (req, res) => {
  try {
    const { courseID } = req.params;
    const course = await Course.findById(courseID);
    if (!course) {
      return res.status(400).json({ msg: "course not found" });
    }
    course.isPublished = !course.isPublished;
    await course.save();
    return res.status(200).json({
      msg: `course ${
        course.isPublished == true ? "published" : "unpublished"
      } successfully`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "internal server error. please try again later" });
  }
};

const getAllPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "username photoUrl",
    });
    if (!courses || courses.length === 0) {
      return res.status(400).json({ msg: "no published courses found" });
    }
    return res.status(200).json({ msg: "published courses found", courses });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "internal server error. please try again later" });
  }
};

const getCoursesByQuery = async (req, res) => {
  try {
    let { category = [], sortByPrice = "" } = req.query;
    console.log(req.query);
    if (typeof category === "string") {
      category = category.split(",");
    }
    console.log('category' , category);

    const searchCriteria = { isPublished: true };

    // Build $or array for all categories and all fields
    if (category.length > 0 && category[0] !== "") {
      searchCriteria.$or = [];
      category.forEach((cat) => {
        searchCriteria.$or.push(
          { courseTitle: { $regex: cat, $options: "i" } },
          { subTitle: { $regex: cat, $options: "i" } },
          { category: { $regex: cat, $options: "i" } }
        );
      });
    }

    const sortOptions = {};
    console.log(sortByPrice);
    if (sortByPrice == "low to high") {
      sortOptions.coursePrice = 1;
    } else {
      sortOptions.coursePrice = -1;
    }
    const courses = await Course.find(searchCriteria)
      .populate({ path: "creator", select: "name photoUrl" })
      .sort(sortOptions);
    console.log(courses);
    if (courses.length == 0) {
      return res.status(400).json({ msg: "no course found" });
    }
    return res.status(200).json({ msg: "courses found", courses });
   
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "internal server error. please try again after some time" });
  }
};
export {
  getAllCoursesForAdmin,
  createCourse,
  editCourse,
  getCourse,
  publishUnpublishCourse,
  getAllPublishedCourses,
  getCoursesByQuery,
};
