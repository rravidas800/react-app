const express=require('express');
const app=express();
const userRouter=require('./routes/user');
const appRouter=require("./routes/app-routes");
const bodyParser = require('body-parser');
const mongoose=require("mongoose");
const cors=require("cors");
const multer=require("multer");
var forms = multer();

mongoose.connect("mongodb://localhost:27017/my_app");

mongoose.connection.on("error",()=>{
    console.log("Failed to connect to database");
})

mongoose.connection.on("connected",()=>{
    console.log("connected to database");
})

app.use(cors());
//app.use(multer().array())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.use("/api",[userRouter,appRouter]);


app.use("*",(req,res,next)=>{
    res.status(404).json({
        error:"Bad request"
    })
})

module.exports=app;