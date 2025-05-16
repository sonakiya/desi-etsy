const User = require("../models/user")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

//signup controller
exports.signup=async (req,res)=>{
  try{
    const {name,email,password,role}= req.body; //get data from request

    //check if user already exist
    const existingUser = await User.findOne({email})
    if(existingUser)
      return res.status(400).json({msg:"User already exists"});

    //hash the password before saving
    const hashedpassword = await bcrypt.hash(password,10);

    //create new user
    const user = await User.create({
      name,
      email,
      password:hashedpassword,
      role,
    });
    res.status(201).json({msg:"User registered successfully"}) //Success
  }catch(error){
    res.status(500).json({msg:"Signup Failed",error:err.message}) //error
  }
};


//Login Controller
exports.login = async(req,res)=>{
  try{
    const {email,password}=req.body;

    //find user by email
    const user = await User.findOne({email})
    if(!user)
      return res.status(404).json({msg:"User not found"});

    //compare provided password with hashed password
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch)
      return res.status(401).json({msg:"Invalid credentials"});

    //create jwt token with userId and role
    const token = jwt.sign(
      {userId:user._id,role:user.role},
      process.env.JWT_SECRET,
      {expiresIn:"10d"}  //token valid for 10 days
    ); 

    //send token and user info
    res.json({
      msg:"Login successfully",
      token,
      user:{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
      }
    });
    }catch(err){
      res.status(500).json({msg:"Login failed",error:err.message});
    }
};