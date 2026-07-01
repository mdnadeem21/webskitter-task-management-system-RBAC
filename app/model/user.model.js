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
        enum:['user','admin','manager'],
        default:'user'
    }
},{timestamps:true});

const User=mongoose.model('manage-role-based-user',UserSchema);

module.exports=User;