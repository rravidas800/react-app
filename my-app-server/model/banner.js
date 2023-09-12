const mongoose=require('mongoose');

const BannerSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{type:String,require:true},
    description:{type:String,require:true},
    banner_link:{type:String},
    banner_image:String,
    publish:{type:Boolean,default:false},
    deleted:{type:Boolean,default:false},
    createdOn:{type:Date,default:Date.now}
})

module.exports=mongoose.model("Banner",BannerSchema);