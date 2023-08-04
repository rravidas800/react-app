const express=require('express');
const routes=express.Router();
const jwt=require("jsonwebtoken");
const category = require('../model/category');
const Items=require('../model/items');
const mongoose = require('mongoose');
const { JWT_SECRET,verifyJwtToken } =require("../config/common");
const multer=require('multer');

const {fileUpload}=require("../middleware/fileupload");





const itemImage = fileUpload.single('item_image');
/*------API for magage item----------*/
routes.post("/item/:type",verifyJwtToken,async(req,res,next)=>{
    try{
            if(req.params.type=='save')
            {
                itemImage(req,res,function(err){
                 
                    if(err instanceof multer.MulterError) {
                        // A multer error occurred (e.g., file size exceeded or invalid file type)
                        return res.status(200).json({status:"failed",error: err.message, message: err.message});
                    } else if (err) {
                        // Some other error occurred
                        return res.status(200).json({status:"failed",error: err.message, message: err.message});
                    }
        
                    if(req.file)
                    {
                        uploadedItemImageName=req.file.filename;
                    
                        const itemData=new Items({
                            _id:new mongoose.Types.ObjectId,
                            item_name:req.body.item_name,
                            category:req.body.category_id,
                            price:req.body.price,
                            description:req.body.description,
                            item_image:{
                                    _id:new mongoose.Types.ObjectId,
                                    item_image:uploadedItemImageName
                                }
                        })
                        itemData.save()
                        .then(result=>{
                            return res.status(200).json({
                                status:"success",
                                message:"Record submitted successfully"
                            })
                        }).catch(err=>{
                            return res.status(200).json({
                                status:"failed",
                                message:"Failed to submit the record!"
                            })
                        })
                    }
                })
            }else if(req.params.type=='view')
            {
                    let searchParam=req.body.searchParam;
                    const pageSize=req.body.limit?req.body.limit:0;
                    const pageNumber=req.body.pageNumber?req.body.pageNumber:1;
                    const skipCount=(pageNumber-1)*pageSize;
                    searchParam={...searchParam,deleted:0};

                    const totalRecord = await Items.countDocuments(searchParam);

                    Items.find(searchParam).populate('category','category').sort({ createdOn: -1 })
                    .skip(skipCount)
                    .limit(pageSize)
                    .then(result=>{
                        return res.status(200).json({
                            status:"success",
                            result:result,
                            total_page:Math.ceil(totalRecord/pageSize)
                        });
                    })
                    .catch(err=>{
                        return  res.status(200).json({
                            status:"failed",
                            result:"",
                            msg:"Something went worng. Try again later!"
                        });
                    }) 
            }
        
       
     }catch(err)
      {
            return res.status(500).json({
                "status":"failed",
                "message":"Something went wrong! try again later",
                error:err
            })
        } 
})

/*------------Api for manage category-------*/
routes.post("/category/:type",async(req,res,next)=>{
    try{
            if(req.params.type=='add')
            {
                jwt.verify(req.body.accessToken,JWT_SECRET,(err,decode)=>{
                if(err)
                { 
                    return res.status(200).json({
                        "status":"200",
                        "result":err
                    });
                 }else
                 {
                    if(req.body._id)
                    {
                        const updateData={
                           'category':req.body.category
                        }
                        category.findByIdAndUpdate(req.body._id,updateData,{new:true,runValidators:true})
                        .then(result=>{
                            return res.status(200).json({
                                    status:"success",
                                    msg:"Record updated successfully"
                            })
                        })
                       .catch(err=>{
                            return res.status(200).json({
                                status:"failed",
                                msg:"Failed to update the record."
                            })  
                       })
                    }else{
                        const categorySchema=new category({
                            _id:new mongoose.Types.ObjectId,
                            category:req.body.category
                        })
                        categorySchema.save()
                        .then((result)=>{
                             return res.status(200).json({
                                status:"success",
                                msg:"Record saved successfully"
                             })   
                        }).catch(err=>{
                            return res.status(200).json({
                                status:"failed",
                                msg:"failed to save record."
                             })   
                        })
                    }
                 }
                })
                
            }else if(req.params.type=='view')
            {
                let searchParam=req.body.searchParam;
                const pageSize=req.body.limit?req.body.limit:0;
                const pageNumber=req.body.pageNumber?req.body.pageNumber:1;
                const skipCount=(pageNumber-1)*pageSize;
                searchParam={...searchParam,deleted:0};
                
                jwt.verify(req.body.accessToken,JWT_SECRET,async(err,decode)=>{
                    if(err)
                    { 
                        return res.status(200).json({
                            "status":"200",
                            "result":err
                        });
                     }else
                     {
                        const totalRecord = await category.countDocuments(searchParam);
                        
                        category.find(searchParam).sort({ createdOn: -1 })
                            .skip(skipCount)
                            .limit(pageSize)
                            .then((result)=>{
                                   
                                    return res.status(200).json({
                                        status:"success",
                                        result:result,
                                        total_page:Math.ceil(totalRecord/pageSize)
                                    })                                
                            })
                            .catch(err=>{
                                
                                    return res.status(200).json({
                                        status:"failed",
                                        msg:"something went wrong. try again later",
                                        error:err
                                    })
                                
                            })
                     }
                    })
            }else if(req.params.type=='delete')
            {   
                let _id=req.body._id;
                let accessToken=req.body.accessToken;
                if(_id)
                {
                    jwt.verify(req.body.accessToken,JWT_SECRET,async(err,decode)=>{
                        if(err)
                        {
                            return res.status(200).json({
                                "status":"failed",
                                "result":err
                            });
                        }else
                        {
                            let updateParams={
                                deleted:1
                            }
                            category.findByIdAndUpdate(_id,updateParams,{new:true,runValidators:true})
                            .then(result=>{
                                return res.status(200).json({
                                    "status":"success",
                                    "msg":"Record deleted successfully"
                                });
                            })
                            .catch(err=>{
                                return res.status(200).json({
                                    "status":"failed",
                                    "result":err
                                });
                            })
                        }
                    })
                }else{
                    return res.status(200).json({
                        "status":"failed",
                        "result":err
                    });
                }
            }
        }
        catch(e){
            return res.status(500).json({
                "status":"500",
                "message":"something went wrong!",
                "error":e.message
            });
        }
            
})

module.exports=routes;