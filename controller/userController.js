const User=require("../schema/userModel");
//const Errorhandler = require("../utils/errorHandler");
//const{sendEmail}=require("../middleware/sendEmail")
const crypto=require("crypto")


exports.registerUser=async(req,res,next)=>{
    try {
        const {name,email,password}=req.body
        let user=await User.findOne({email});
        if(user){
            return next(new Errorhandler("user already exist",400))
        }
      const response= await fetch(`https://alfa-leetcode-api.onrender.com/${username}`)
      const userResponse=await response.json()

      if(userResponse.errors.length>0){
        return next(new Errorhandler("invalid Leetcode Username",400))
      }else{
            user=await User.create({name,email,password})
            const token=await user.generateToken();
            res.status(201).cookie("token",token,{expires:new Date(Date.now()+90*24*60*60*1000),httpOnly:true}).json({
                success:true,
                user,
                token
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.filterUser=async(req,res,next)=>{
    
}


exports.loginUser=async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email}).select("+password")
        if(!user){
            return next(new Errorhandler("User does not exist",400))
        }
        const isMatch=await user.matchPassword(password)
        if(!isMatch){
           return next(new Errorhandler("incorrect password",400)) 
        }
        const token=await user.generateToken();
        res.status(200).cookie("token",token,{expires:new Date(Date.now()+90*24*60*60*1000),httpOnly:true}).json({
            success:true,
            user,
            token
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.logoutUser=async(req,res,next)=>{
    try {
        res.status(200).cookie("token",null,{expires:new Date(Date.now()),httpOnly:true}).json({
            success:true,
            message:"User logged out"
        })
    } catch (error) {
        return next(new Errorhandler(error.message,500))

    }
}