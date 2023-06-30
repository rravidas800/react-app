const express=require("express");
const router=express.Router();
const UserModel=require("../model/user");
const bcrypt=require("bcrypt");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");

router.post("/register",(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err)
        {
            return res.status(500).json({
                message:"Failed to register",
                err:err
            })
        }else{
            const user=new UserModel({
                _id:new mongoose.Types.ObjectId,
                username:req.body.username,
                password:hash,
                phone:req.body.phone_no,
                email:req.body.email,
                userType:req.body.userType
            })
            user.save()
            .then(result=>{
                res.status(200).json({
                    status:200,
                    message:"Record saved successfully",
                    result:result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message:"Failed to save",
                    error:err
                })
            })
        }
    })
})

router.post("/login",(req,res,next)=>{
    UserModel.find({email:req.body.email}).exec()
    .then(user=>{
        if(user.length>0)
        {
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(result)
                {
                    const token=jwt.sign({
                        data:{
                            _id:user[0]._id,
                            username:user[0].username,
                            email:user[0].email,
                            phone:user[0].phone,
                            userType:user[0].userType
                        }
                    },'secret',{expiresIn:60*60});

                    if(token)
                    {
                        return res.status(200).json({
                            status:200,
                            _id:user[0]._id,
                            username:user[0].username,
                            email:user[0].email,
                            phone:user[0].phone,
                            userType:user[0].userType,
                            accessToken:token
                        })
                    }else
                    {
                        return res.status(200).json({
                            message:"Invalid user id or password"
                        })
                    }

                }else{
                    res.status(200).json({
                        status:"210",
                        message:"Invalid user id or password"
                    })
                }

            })
        }else{
            res.status(210).json({
                status:"210",
                message:"Invalid user id or password"
            })
        }
    })
    .catch(err=>{
            res.status(200).json({
                status:500,
                message:"Something went wrong! try after some time"
            })
    })
    
})

router.post("/verifytoken",(req,res,next)=>{
    let accessToken=req.body.accessToken;
    jwt.verify(accessToken,'secret',(err,decode)=>{
        if(err)
        {
            return res.status(200).json({
                status:"failed",
                result:"expired"
            })
        }else{
            const token=jwt.sign({
                data:decode.data
            },'secret',{expiresIn:60*60});

            if(token)
            {
                return res.status(200).json({
                    status:"200",
                    accessToken:token
                })
            }else{
                return res.status(200).json({
                    status:"failed",
                    result:"expired"
                })
            }
            
        }
    })
})

module.exports=router;