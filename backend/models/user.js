const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trime:true, //remove whitespace
  },
  email:{
    type:String,
    required:true,
    unique:true, //no two users can have the same email
    lowercase:true //converts email into lowercase
    
  },
  password:{
    type:String,
    required:true,
  },
  role:{
    type:String,
    enum:["customer","artisan","admin"], //only these values are allowed
    default:"customer"
  },
},
  {timestamps:true }); // Add createdAt and updatedAt fields

  //export the model to use in other files
module.exports=mongoose.model("User",userSchema);