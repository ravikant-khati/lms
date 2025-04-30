import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('database conneted');
    } catch (error) {
        console.log(`data failed to connet ${error}`);
    }
}

export default connectDB