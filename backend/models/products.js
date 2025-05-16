const mongoose= require("mongoose")

//define product schema 
const productSchema =new mongoose.Schema({
  title:{
    type:String,
    required:true,
    trim:true,
  },
  description:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,

  },
  category:{
    type:String,
    enum:["Home Decor","Clothing","Accessories","Paintings","Others"],
    required:true
  },
  image:{
    type:String,
    default:"no-image.jpeg",

  },
  artisan:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User", //reference to user who created this product
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now,
  }
});

module.exports=mongoose.model("Product",productSchema);