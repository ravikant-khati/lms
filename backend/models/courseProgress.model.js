import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema(
  {
    courseID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    lectureProgress: [
      {
        lectureID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Lecture",
          required: true,
        },
        viewed: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);
const Progress = mongoose.model("Progress", courseProgressSchema);
export default Progress;
