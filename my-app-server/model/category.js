const mongoose=require("mongoose");

const CategorySchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    "category":{type:String,require:true},
    "deleted":{ type:Boolean,default:0},
    "createdOn":{type:Date,default:Date.now}
})

module.exports=mongoose.model("Category",CategorySchema); 