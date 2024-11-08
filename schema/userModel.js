const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const crypto=require("crypto")
const validator=require("validator");

const userSchema=new mongoose.Schema({
    leetcodeUsername: { type: String, unique: true, required: true },
    password: { type: String, required: true }, 
    score: { type: Number, default: 0 },
    totalMatches: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
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