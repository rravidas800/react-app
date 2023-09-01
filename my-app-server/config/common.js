
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

const generateItemimageid=(resultSet)=>{
    console.log(resultSet);
    const existingIds = resultSet.map((itemImage) => itemImage._id);
    console.log(existingIds); 
    
    let newId = 1002;
    while (existingIds.includes(newId)) {
        newId++;
    }
    return newId;
}

module.exports={
    JWT_SECRET,verifyJwtToken,generateItemimageid
}