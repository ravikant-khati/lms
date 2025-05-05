import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/dbConnet.js'
import userRouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import cors from "cors"
import courseRouter from './routes/course.routes.js'

dotenv.config()
const PORT = process.env.PORT || 8080
const app = express()


//! default middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.use('/user' , userRouter)
app.use('/course' , courseRouter)


app.listen(PORT , ()=>{
    connectDB()
    console.log(`server started at ${PORT}`);
})