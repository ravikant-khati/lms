import express from "express"
import { getCourseProgress, updateCourseProgress } from "../controllers/courseProgress.controller.js"
import isAuthenticate from "../middlewares/isAuthenticated.js"

const courseProgressRouter = express.Router()
courseProgressRouter.get('/:courseID' ,isAuthenticate , getCourseProgress)
courseProgressRouter.post('/update-course-progress/:courseID' , isAuthenticate , updateCourseProgress)

export default courseProgressRouter