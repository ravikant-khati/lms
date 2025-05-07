import express from 'express'
import isAuthenticate from '../middlewares/isAuthenticated.js'
import { createLecture, getCourseAllLectures } from '../controllers/lecture.controller.js'

const lectureRouter = express.Router()
lectureRouter.post("/create-lecture" , isAuthenticate, createLecture)
lectureRouter.get("/:courseID/get-all-lectures" , isAuthenticate , getCourseAllLectures)

export default lectureRouter