import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import GenerateToken from "../utils/generateToken.js";
import cloudinary from "../utils/cloudinary.js";
import fs from 'fs'
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "all fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    return res.status(201).json({ msg: "user account created" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "server error. please try after some time", error });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "all fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "user need to register itself first" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ msg: "invalid credentials." });
    }
    GenerateToken(user, res);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "server error. please try again after some time", error });
  }
};
const logout = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { httpOnly: true, maxAge: 0 })
      .json({ msg: "loged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "server error. please try again after some time", error });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password").populate('enrolledCourses');
    if (!user) {
      return res.status(404).json({ msg: "profile not found" });
    }
    return res.status(200).json({ msg: "user found", user });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "server error. please try again after some time", error });
  }
};
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name } = req.body;
    const profilePhoto = req.file;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    if (user.photoUrl) {
      const publicId = user.photoUrl.split("/").pop().split(".")[0];
      console.log(publicId);
      await cloudinary.uploader.destroy(publicId)
    }
    const result = await cloudinary.uploader.upload(profilePhoto.path, {
      folder: "myFolder", // optional: your Cloudinary folder
    });
    fs.unlinkSync(profilePhoto.path)
    user.username = name
    user.photoUrl = result.secure_url
    await user.save()
    res.status(200).json({msg:"file replaced successfully"})
    
   
  } catch (error) {
    res
      .status(500)
      .json({ msg: "server error. please try again after some time", error });
  }
};
export { signup, login, logout, getUserProfile, updateProfile };
