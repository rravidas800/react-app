const express=require('express');
const routes=express.Router();
const jwt=require("jsonwebtoken");
const category = require('../model/category');
const mongoose = require('mongoose');
const { JWT_SECRET } =require("../config/common");


routes.post("/category/:type",(req,res,next)=>{
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
                    const categorySchema=new category({
                        _id:new mongoose.Types.ObjectId,
                        category:req.body.category
                    })
                    categorySchema.save()
                    .then((result)=>{
                         return res.status(200).json({
                            status:"success",
                            msg:"record saved successfully"
                         })   
                    }).catch(err=>{
                        return res.status(200).json({
                            status:"failed",
                            msg:"failed to save record."
                         })   
                    })
                 }
                })
                
            }else if(req.params.type=='view')
            {

                const pageSize=req.body.limit;
                const pageNumber=req.body.pageNumber;
                const skipCount=(pageNumber-1)*pageSize;
                

                jwt.verify(req.body.accessToken,JWT_SECRET,async(err,decode)=>{
                    if(err)
                    { 
                        return res.status(200).json({
                            "status":"200",
                            "result":err
                        });
                     }else
                     {
                        const totalRecord = await category.countDocuments();
                        
                        category.find()
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