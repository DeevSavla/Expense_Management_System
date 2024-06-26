import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required and should be unique'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is required'],
        unique:true
    }
},{timestamps:true})

export const user= mongoose.model('users',userSchema)

