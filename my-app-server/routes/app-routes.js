const express=require('express');
const routes=express.Router();
const jwt=require("jsonwebtoken");
const category = require('../model/category');
const mongoose = require('mongoose');
const { JWT_SECRET } =require("../config/common");


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