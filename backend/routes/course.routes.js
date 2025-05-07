import express from "express";
import {
  createCourse,
  editCourse,
  getAllCoursesForAdmin,
  getCourse,
} from "../controllers/course.controller.js";
import isAuthenticate from "../middlewares/isAuthenticated.js";
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

export default courseRouter;
