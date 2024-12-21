const asyncHandler=require('express-async-handler')
const User=require('../models/userModels')
const bcrypt=require('bcrypt')
const jwt = require("jsonwebtoken")
//@des get all contacts
//@route GET /api/contacts
//@access public
const  registerUser=asyncHandler(async(req,resp)=>{
     const {username, email,password}= req.body
     if(!username || !email || !password){
     resp.status(400);
     throw new Error("all field are mandatory")
     }
     const userAvalible=await User.findOne({email});
     if(userAvalible){
        resp.status(400);
        throw new Error("Email is already exist")
     }

     //Hashed Password
     const hashedPassword=await bcrypt.hash(password,10)
     const user=await User.create({
        username,
        email,
        password:hashedPassword
     })
     console.log(`User created ${user}`)
     if(user){
        resp.json({_id:user.id, 
            email:user.email,})
        }else{
            resp.status(400)
            throw new Error("User data is not Valid")
        }
     resp.json({message:"Register  the user"})
})

const loginUser=asyncHandler(async(req,resp)=>{
    const {email, password}=req.body
    if(!email|| !password){
        resp.status(400)
        throw new Error("all fields are mandatory")
    }
    const user=await User.findOne({email})
    //compare the passwrod with hashedpassword
   if(user && (await bcrypt.compare(password,user.password))){
    const AccessToken=jwt.sign(
        {
            user:{
                username: user.username,
                email: user.email,
                id:user.id
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '30m'}
    )
    resp.status(200).json({AccessToken})
   }
   else{
    resp.status(401)
    throw new Error("Email or password is not  valid")
   }
})


const currentUser=asyncHandler(async(req,resp)=>{
    resp.json(req.user)
})
module.exports={registerUser,loginUser,currentUser}