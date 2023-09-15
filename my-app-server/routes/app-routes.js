const express=require('express');
const routes=express.Router();
const jwt=require("jsonwebtoken");
const category = require('../model/category');
const Items=require('../model/items');
const Banner=require("../model/banner");
const mongoose = require('mongoose');
const { JWT_SECRET,verifyJwtToken,generateItemimageid } =require("../config/common");
const multer=require('multer');

const {fileUpload}=require("../middleware/fileupload");


const uploadMultipleImage=fileUpload.array('image',5);


const itemImage = fileUpload.single('item_image');
const bannerImage=fileUpload.single('banner_image');

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
                    
                    /*--------Update Item details by id------*/
                    if(req.body._id)
                    {
                        let updateParams={
                            item_name:req.body.item_name,
                            category:req.body.category_id,
                            price:req.body.price,
                            description:req.body.description
                        }
                        
                        Items.findByIdAndUpdate(req.body._id,updateParams)
                        .then(result=>{
                            return res.status(200).json({
                                status:"success",
                                message:"Record updated successfully."
                            })
                        })
                        .catch(err=>{
                            
                            return res.status(200).json({
                                error:err,
                                status:"failed",
                                message:"Failed to update the record! try again later",
                                
                            })
                        })  
                    }

                    /*------------------End--------------------*/

                    /*-------------Add New Item-----------*/
                    
                    if(req.file)
                    {
                        uploadedItemImageName=req.file.filename;
                       
                        const itemData=new Items({
                            _id:new mongoose.Types.ObjectId,
                            item_name:req.body.item_name,
                            category:req.body.category_id,
                            price:req.body.price,
                            description:req.body.description,
                            item_image:[{
                                    _id:1001,
                                    image:uploadedItemImageName
                                }]
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
                    /*------------end------------*/
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
            }else if(req.params.type=='remove-image')
            {
                let item_id=req.body.item_id;
                let image_id=req.body.image_id;
                const filter = { _id: item_id };
                const update = { $pull: { item_image: { _id: image_id } } };
                
                // Use findOneAndUpdate to update and return the modified document
                Items.findOneAndUpdate(filter, update, { new: true })
                .then((updatedItem) => {
                    if (updatedItem) {
                    return res.status(200).json({
                        status: "success",
                        result: "Image Removed",
                    });
                    } else {
                    return res.status(404).json({
                        status: "failed",
                        message: "Item not found",
                    });
                    }
                })
                .catch((err) => {
                    return res.status(500).json({
                        status: "failed",
                        err: err.message,
                    });
                });
            }else if(req.params.type=='delete')
            {
                if(req.body._id)
                {
                    let updateParams={                        
                      deleted:true
                    }
                    Items.findOneAndUpdate({_id:req.body._id},updateParams)
                    .then(result=>
                    {
                        return res.status(200).json({
                            status:success,
                            message:"Success! Item deleted successfully."
                        })
                    })
                    .catch(err=>{
                        return res.status(200).json({
                            status:"failed",
                            message:"Failed! failed to delete item! try again later"
                        })
                    })
                }
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

/*--------Upload images for item-------*/
routes.post("/upload-item-images",verifyJwtToken,(req,res,next)=>{
   
     uploadMultipleImage(req,res,async function(err){
                    
            if(err instanceof multer.MulterError) {
                // A multer error occurred (e.g., file size exceeded or invalid file type)
                return res.status(200).json({status:"failed",error: err.message, message: err.message});
            } else if (err) {
                // Some other error occurred
                return res.status(200).json({status:"failed",error: err.message, message: err.message});
            }
            
            if(req.files)
            { 
                const item_id=req.body._id;
               
                const itemresult=  await Items.findById(item_id);
                let newItemImageId =generateItemimageid(itemresult.item_image);
                var itemImage=[];
                for(let file of req.files)
                {
                    itemImage.push({_id:newItemImageId,image:file.filename})
                    newItemImageId++;
                }
               

                Items.updateOne({_id:item_id},{$push:{item_image:{$each:itemImage}}})
                .then(result=>{
                    return res.status(200).json({
                        status:"success",
                        msg:"images uploaded successfully"
                    })
                })
                .catch(err=>{
                    return res.status(200).json({
                        status:"failed",
                        msg:"failed to upload images"
                    })
                })
            }
            
    })
    
})

/*------------end--------*/


/*------------Api for manage category-------*/
routes.post("/category/:type",verifyJwtToken,async(req,res,next)=>{
    try{
            if(req.params.type=='add')
            {
                itemImage(req,res,function(err){
                    
                    if(err instanceof multer.MulterError) {
                        // A multer error occurred (e.g., file size exceeded or invalid file type)
                        return res.status(200).json({status:"failed",error: err.message, message: err.message});
                    } else if (err) {
                        // Some other error occurred
                        return res.status(200).json({status:"failed",error: err.message, message: err.message});
                    }
                   
                if(req.body._id)
                    {
                        let updateData;
                        if(req.file)
                        {
                            updateData={
                                'category':req.body.category,
                                'image':req.file.filename
                            }
                        }else{
                            updateData={
                                'category':req.body.category
                            }
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
                        let category_image="";
                        if(req.file)
                        {
                            category_image=req.file.filename;
                        }
                        const categorySchema=new category({
                            _id:new mongoose.Types.ObjectId,
                            category:req.body.category,
                            image:category_image
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
                
                 });
                
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


routes.post('/banner/:type',verifyJwtToken,async(req,res,next)=>{
    
 // try{
    
        if(req.params.type=='save')
        {
            
                bannerImage(req,res,function(err){
                        if(err instanceof multer.MulterError) {
                            // A multer error occurred (e.g., file size exceeded or invalid file type)
                            return res.status(200).json({status:"failed",error: err.message, message: err.message});
                        } else if (err) {
                            // Some other error occurred
                            return res.status(200).json({status:"failed",error: err.message, message: err.message});
                        }
                        
                        if(req.body._id)
                        {
                            const banner_id=req.body._id;
                            let updateData={};
                            if(req.file){
                                updateData={
                                    title:req.body.title,
                                    description:req.body.description,
                                    banner_link:req.body.banner_link,
                                    banner_image:req.file.filename
                                }
                            }else
                            {
                                updateData={
                                    title:req.body.title,
                                    description:req.body.description,
                                    banner_link:req.body.banner_link
                                }
                            }

                            Banner.findByIdAndUpdate(banner_id,updateData,{nre:true,runValidators:true})
                            .then(result=>{
                                return res.status(200).json({
                                    status:"success",
                                    message:"Record updated successfully",
                                })
                            })
                            .catch(err=>{
                                return res.status(210).json({
                                    status:"failed",
                                    message:"Failed to update Record! try again later"
                                })
                            })

                        }else{
                            if(req.file)
                            {
                                uploadedBannerImage=req.file.filename;
                                const bannerScheme=new Banner({
                                    _id:new mongoose.Types.ObjectId,
                                    title:req.body.title,
                                    description:req.body.description,
                                    banner_link:req.body.banner_link,
                                    banner_image:uploadedBannerImage
                                })
                                bannerScheme.save()
                                .then(result=>{
                                    return res.status(200).json({
                                        "status":"success",
                                        "message":"Record saved successfully"
                                    })
                                })
                                .catch(err=>{
                                    return res.status(200).json({
                                        "status":"failed",
                                        "message":"Failed to save record! try again later"
                                    })
                                })
                            }else{
                                return res.status(200).json({
                                    "status":"failed",
                                    "message":"Please upload banner image"
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
          
            const totalRecord=await Banner.countDocuments(searchParam); 
            Banner.find(searchParam).sort({createdOn:-1})
            .skip(skipCount)
            .limit(pageSize)
            .then(result=>{
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
   // }
   /*  catch(e){
        return res.status(500).json({
            "status":"failed",
            "message":"Something went wrong! try again later",
            "error":e.message
        })
    } */
})

module.exports=routes;