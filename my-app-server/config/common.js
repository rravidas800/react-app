
const jwt=require("jsonwebtoken");
const JWT_SECRET="secret";

const verifyJwtToken=(req,res,next)=>{
    const accessToken=req.headers.authorization;
   
    if(!accessToken)
    {
        return res.status(403).json({ error: 'No token provided' });
    }else
    {
        jwt.verify(accessToken,JWT_SECRET,(err,decode)=>{
            if(err)
            {
                return res.status(401).json({ error: 'Invalid token '+accessToken });
            }
            req.user=decode;
            next();
        })
    }
}
module.exports={
    JWT_SECRET,verifyJwtToken
}