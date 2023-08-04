const multer=require('multer');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'_'+file.originalname);
    }
})

const fileUpload=multer({
    storage:storage,
    limits:{
        fileSize:524288 // 500kb file upload
    },
    fileFilter:function(req,file,cd){
        
        if(file.mimetype.startsWith('image/')){
            cd(null,true);
        }else
        {
            cd(new Error('Only image files are allowed!'),true);
        }
    }
})


module.exports={
    fileUpload
}
