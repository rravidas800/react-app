const mongoose=require('mongoose');


const items=new mongoose.Schema({
    _id:mongoose.Schema.ObjectId,
    item_name:{type:String, require:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:'Category',require:true},
    price:{type:Number,require:true},
    description:{type:String,require:true},
    item_image:{type:Object,require:true},
    "createdOn":{type:Date,default:Date.now},
    "deleted":{ type:Boolean,default:0},
})

module.exports=mongoose.model("Items",items);