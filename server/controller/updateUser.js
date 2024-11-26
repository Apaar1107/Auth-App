const bcrypt=require("bcrypt");
const { findByIdAndUpdate } = require("../models/user");
const User =require('../models/user')
// const gravatar = require('gravatar-url');
exports.updateUser=async(req,res)=>{
  
        
        if(req.user.id !==req.params.id){
            return res.status(401).json({
                success:false,
                message:"You can update only ypur account"
            })
        }

     try {
          
           if(req.body.password){
            req.user.password=await bcrypt.hash(req.body.password,10);
           }
           if(req.body.email){
            req.user.email=req.body.email;
            
        }
        
        if(req.body.username){
                req.user.username=req.body.username;

           }

        

           const user=await User.findByIdAndUpdate(req.params.id,{
            
                username:req.user.username,
                email:req.user.email,
                password:req.user.password,
               
            
           },{new:true});
           user.password=undefined;
           

           res.status(200).json({
            success:true,
            message:"User updated successfully",
            user
           })
    } catch (error) {
        
        return res.status(500).json({
             success:false,
             message:"User updation failure"
        })
    }
}