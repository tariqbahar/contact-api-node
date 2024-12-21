const asyncHandler=require('express-async-handler')
const jwt =require('jsonwebtoken')


const validateToken=asyncHandler(async(req,resp,next)=>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization
    if(authHeader && authHeader.startsWith('Bearer')){
        token =authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                resp.status(401)
                throw new Error("User is not authoraized")
            }
            req.user=decoded.user
            next()
        })
        if(!token){
            resp.status(401)
            throw new Error("user is not authoraized or token missing")
        }
         
    }

})
module.exports=validateToken