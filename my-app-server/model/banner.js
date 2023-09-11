const mongoose=require('mongoose');

const BannerSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{type:String,require:true},
    description:{type:String,require:true},
    banner_link:{type:String},
    banner_image:String,
    publishStatus:{type:Boolean,default:false},
    deletedStatus:{type:Boolean,default:false}
})

module.exports=mongoose.model("Banner",BannerSchema);