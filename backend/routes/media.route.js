import express from "express"
import isAuthenticate from "../middlewares/isAuthenticated.js";
import { uploadVideo } from "../controllers/media.controller.js";
import multer from "multer";
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

const mediaRouter = express.Router();

mediaRouter.post('/upload-video' , isAuthenticate, upload.single("lectureVideo") , uploadVideo)

export default mediaRouter