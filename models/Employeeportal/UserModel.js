const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username:{
        type:String , 
        required:true ,
    } ,
    email:{
        type:String
    } , 
    password:{
        type:String,
        required:true
    } ,
    isAdmin:Boolean ,
    gender:{
        type:String , 
        enum:["male" , "female"]
    },
})

const User =  mongoose.model("user" , UserSchema)
module.exports = User 

