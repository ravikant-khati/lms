import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import GenerateToken from "../utils/generateToken.js";
const signup = async (req,res)=>{
    try {
    const {username , email ,password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({msg:"all fields are required"})
    }
    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({msg:"user already exists"})
    }
    const hashedPassword =await bcrypt.hash(password, 10);
    const newUser = await User.create({...req.body , password:hashedPassword})
    return res.status(201).json({msg:"user account created"})
    } catch (error) {
        return res.status(500).json({msg:"server error. please try after some time" , error})
        
    }
}
const login = async (req,res)=>{
    try {
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({msg:"all fields are required"})
        }
        const user =await User.findOne({email})
        if(!user){
            return res.status(400).json({msg:"user need to register itself first"})
        }
        const passwordCompare = await bcrypt.compare(password , user.password)
        if(!passwordCompare){
            return res.status(400).json({msg:"invalid credentials."})
        }
        GenerateToken(user , res)

    } catch (error) {
        return res.status(500).json({msg:"server error. please try again after some time" , error})
    }
}
export {signup , login}