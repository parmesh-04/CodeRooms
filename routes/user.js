const express=require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/auth");
const router=express.Router();



router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(isAuthenticated,logoutUser)
router.route("/filter/")



module.exports=router;
