const mongoose=require("mongoose");

const CategorySchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    "category":String,
    "deleted":{ type:Boolean,default:0},
    "createdOn":{type:Date,default:Date.now}
})