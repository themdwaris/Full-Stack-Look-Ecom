import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}},
},{minimize:false})

const userModel = mongoose.models.userModel ||mongoose.model("user",userSchema)

export default userModel