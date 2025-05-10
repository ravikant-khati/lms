import express from "express";
import {
  createCourse,
  editCourse,
  getAllCoursesForAdmin,
  getCourse,
  publishUnpublishCourse,
} from "../controllers/course.controller.js";
import isAuthenticate from "../middlewares/isAuthenticated.js";
import { createLecture, deleteLecture, editLecture, getCourseAllLectures, getLecture } from "../controllers/lecture.controller.js";
import multer from "multer";
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

const courseRouter = express.Router();

courseRouter.get("/all-courses", isAuthenticate, getAllCoursesForAdmin);
courseRouter.post("/create-course", isAuthenticate, createCourse);
courseRouter.put(
  "/edit/:courseID",
  isAuthenticate,
  upload.single("courseThumbnail"),
  editCourse
);
courseRouter.get("/get-course/:courseID", isAuthenticate, getCourse);
courseRouter.patch('/:courseID/toggle-publish/' ,isAuthenticate , publishUnpublishCourse)

//!--lecture related routes
courseRouter.get('/:courseID/get-all-lectures' , isAuthenticate , getCourseAllLectures)
courseRouter.get("/get-lecture/:lectureID" , isAuthenticate , getLecture)
courseRouter.post("/:courseID/create-lecture" , isAuthenticate , createLecture)
courseRouter.put('/:courseID/update-lecture/:lectureID' , isAuthenticate , editLecture)
courseRouter.delete("/:courseID/delete-lecture/:lectureID" , isAuthenticate , deleteLecture)


export default courseRouter;
