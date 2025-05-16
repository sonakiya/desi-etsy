const mongoose = require("mongoose");

const connectdb=async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI
    );
    console.log("MongoDb connected");
  }catch(error){
    console.error("MongoDb Connection Failed",error);
    process.exit(1);
  }
};
module.exports=connectdb;