const asyncHandler=require('express-async-handler')
const Contact=require("../models/contactModels")
//@des get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async(req, resp)=>{
    const  getContacts= await Contact.find({user_id:req.user.id});
    resp.status(200).json(getContacts)
})

//@des get all contacts
//@route GET /api/contacts
//@access public
const createContact=asyncHandler(async(req,resp)=>{
    console.log("the request body is:",req.body)
    const {name,email,phone}=req.body
    if(!name||!email||!phone){
        resp.status(400);
        throw new Error("All request bodyis :")
    }
    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,

    })

    resp.status(200).json(contact)
})

//@des get all contacts
//@route GET /api/contacts
//@access public
const deleteContact=asyncHandler(async(req,resp)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        resp.status(404)
        throw new Error('contact not found')
    }
    if(contact.user_id.toString() !== req.user.id){
        resp.status(403);
        throw new Error("User Can't  have permesion to update other user contacts");
    }   
   await Contact.deleteOne({_id: req.params.id});
    resp.status(200).json(contact)
})


//@des get all contacts
//@route GET /api/contacts
//@access public
const updateContact=asyncHandler(async(req,resp)=>{
    const contact =await Contact.findById(req.params.id);
    if(!contact){
        resp.status(404)
        throw new Error("Contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        resp.status(403);
        throw new Error("User Can't  have permesion to update other user contacts");
    }
    const updateContcat= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new :true }
    )
    resp.status(200).json(updateContcat)
})

//@des get all contacts
//@route GET /api/contacts
//@access public
const getContact=asyncHandler(async(req,resp)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact){
        resp.status(404)
        throw new Error("contact not found")
    }
    resp.status(200).json(contact)
})



module.exports= { getContact,createContact,deleteContact,updateContact,getContacts};