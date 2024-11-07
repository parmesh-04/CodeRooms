const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const crypto=require("crypto")
const validator=require("validator");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your name"],
        maxlength:[30,"Name cannot exceed 30 characters"],
        minLength:[3,"Name should have at least 3 characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter your name"],
        unique:true,
        validate:[validator.isEmail,"Plaease enter Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your Password"],
        minLength:[8,"Password should exceed 8 caharacters"]
     
    }
})


userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
    next();
    })
    
    
    userSchema.methods.matchPassword=async function(password){
        return await bcrypt.compare(password,this.password)
    }
    
    
    
    userSchema.methods.generateToken=function(){
        return jwt.sign({_id:this._id},process.env.JWT_SECRET)
    }
    
    
    
    userSchema.methods.getResetPasswordToken=function(){
        const resetToken=crypto.randomBytes(20).toString("hex")
        this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex")
        this.resetPasswordExpire=Date.now()+10*60*1000;
        return resetToken;
    }
    
    module.exports=mongoose.model("User",userSchema);