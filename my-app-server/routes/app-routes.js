const express=require('express');
const routes=express.Router();
const jwt=require("jsonwebtoken");

routes.post("/category/:type",(req,res,next)=>{
    try{

    
            if(req.params.type=='add')
            {

                jwt.verify(req.body.accessToken,'secret',(err,decode)=>{
                if(err)
                { 
                    return res.status(200).json({
                        "status":"200",
                        "result":err
                    });
                 }
                })

             
                
            }else if(req.params.type=='view')
            {
                return res.status(200).json({
                    "status":"200",
                    "message":"view category"
                });
            }
        }
        catch(e){
            return res.status(500).json({
                "status":"500",
                "message":"something went wrong!"
            });
        }
            
})

module.exports=routes;