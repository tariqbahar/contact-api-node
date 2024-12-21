const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    username:{
        type: String,
        required: [true,"please add the name"]
    },
    email:{
        type:String,
        required: [true, "Please add the email address"],
        unique:[true,"The email address is already taken"]
    },
    password:{
        type: String,
        required: [true, "please add the password"]
    }
}, { timestamps: true,

});
module.exports=mongoose.model("User",userSchema);