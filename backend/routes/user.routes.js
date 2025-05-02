import express from 'express'
import multer from "multer"
import { getUserProfile, login, logout, signup, updateProfile } from '../controllers/user.controller.js'
import isAuthenticate from '../middlewares/isAuthenticated.js'
const upload = multer({ dest: 'uploads/',limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
} })

const userRouter = express.Router()

userRouter.post('/register' , signup)
userRouter.post('/login' , login)
userRouter.get('/logout' , logout)
userRouter.get('/profile' ,isAuthenticate, getUserProfile)
userRouter.put('/profile-update' , isAuthenticate,upload.single('profilePhoto') ,updateProfile )


export default userRouter