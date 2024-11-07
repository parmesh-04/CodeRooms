const express=require("express");
const { registerUser, loginUser, logoutUser } = require("../controller/userController");
const { isAuthenticated } = require("../middleware/auth");
const router=express.Router();



router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(isAuthenticated,logoutUser)
router.route("/rating").get()



module.exports=router;
