const express=require('express');
const routes=express.Router();

routes.post("/category",(req,res,next)=>{
    
    if(req.body.method=='add')
    {
        

        return res.status(200).json({
            "status":"200",
            "message":"Add category"
        });
    }else if(req.body.method=='view')
    {
        return res.status(200).json({
            "status":"200",
            "message":"view category"
        });
    }
    
    
})

module.exports=routes;