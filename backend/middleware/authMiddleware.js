const jwt = require("jsonwebtoken")

const authMiddleware =(req,res,next)=>{
  //get token from header 
  const authHeader=req.headers.authorization;

  //if no token provided
  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({msg:"Unauthorized, token missing "});
  }

  const token =authHeader.split(" ")[1]; //remove bearer

  try{
    //verify token using secret
    const decoded=jwt.verify(token,process.env.JWT_SECRET);

    //Attach user info to request objects
    req.user=decoded;
    
    
    next(); //move to next middleware or route

  }catch(err){
    res.status(401).json({msg:"Invalid or expired token"});
  }
};

module.exports=authMiddleware;