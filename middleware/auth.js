const User=require("../schema/userModel")
const jwt =require("jsonwebtoken")
const Errorhandler = require("../utils/errorHandler");

exports.isAuthenticated=async(req,res,next)=>{
 try {
    const {token}=req.cookies
    if(!token){
        return next(new Errorhandler("please login to access the information",401))
    }
    const decoded=await jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decoded._id);
    next();
}
  catch (error) {
    return next(new Errorhandler(error.message,500))
 }  

}