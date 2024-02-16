const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is mandatory"]
    },
    email:{
        type:String,
        required:[true,"Email is mandatory"]
    },
    password:{
        type:String,
        required:[true,"Password is mandatory"]
    },
    age:{
        type:Number,
        required:[true,"Age is Required for nutrition plan"],
        min:1
    }
},{timestamps:true})

const userModel=mongoose.model("users",userSchema)

module.exports=userModel;