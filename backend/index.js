import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/dbConnet.js'
import userRouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import cors from "cors"
import courseRouter from './routes/course.routes.js'
import mediaRouter from './routes/media.route.js'
import purchaseCourseRouter from './routes/purchaseCourse.routes.js'
import courseProgressRouter from './routes/courseProgress.routes.js'
import path from 'path';
dotenv.config()
const PORT = process.env.PORT || 8080
const app = express()
const __dirname = path.resolve()


//! default middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.use('/user' , userRouter)
app.use('/course' , courseRouter)
app.use('/media' , mediaRouter)
app.use("/purchase" , purchaseCourseRouter)
app.use("/progress" , courseProgressRouter)

if(process.env.NODE_ENV == 'production'){
    app.use(express.static(path.join(__dirname , '../frontend/dist')))

    app.get("/*splat" , (req,res)=>{
        res.sendFile(path.join(__dirname , '../frontend' , 'dist' , 'index.html'
        ))
    })
}


app.listen(PORT , ()=>{
    connectDB()
    console.log(`server started at ${PORT}`);
})