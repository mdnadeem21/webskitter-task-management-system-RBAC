const express=require('express');
const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['User','Admin','Manager'],
        default:'User'
    }
},{timestamps:true});

const User=mongoose.model('manage-role-based-user',UserSchema);

module.exports=User;