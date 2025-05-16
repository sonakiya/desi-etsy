const express=require("express")
const router=express.Router();
const {signup,login}=require("../controllers/authController");
const authMiddleware=require("../middleware/authMiddleware")



//route to register a new user
router.post("/signup",signup);

//route to login an existing user
router.post("/login",login)

router.get("/protected",authMiddleware,(req,res)=>{
  res.json({msg:"Access granted",user: req.user})
})

module.exports=router;
