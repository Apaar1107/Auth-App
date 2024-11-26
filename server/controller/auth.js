  const User=require('../models/user');
  const bcrypt=require('bcrypt');
  const jwt=require("jsonwebtoken");

exports.signin=async(req,res)=>{
      
    try {
        
       const  {username, email, password}=req.body;

       if(!username || !email || !password){
           return res.status(400).json(
            {
                success:false,
                message:"Please fill all the fields carefully"
            }
           )
       }

       const existingUser= await User.findOne({email});

       if(existingUser){
           return res.status(401).json(
            {
                success:false,
                message:"User already exists"
            }
           )
       }
        let hashedPassword;

       try {
            
        hashedPassword=await bcrypt.hash(password,10);
       } catch (error) {
           return res.status(500).json(
            {
                success:false,
                message:"Issue in hashing password"
            }
           )
       }

       const user =await User.create({username, email, password:hashedPassword});

      return res.status(200).json(
        {
            success:true,
            message:"User Signin Successfully",
            user
        }
       )


    } catch (error) {
       

        res.status(500).json({
            success:false,
            message:"user cannot be signin ,please try again later"
        })
    }
}

exports.login =async(req,res)=>{
    try {
    
        const {email,password}=req.body;
         
        if(!email || !password){
            return res.status(400).json(
                {
                    success:false,
                    message:"Please fill all the fields carefully"
                }
            )
        }

        let user=await User.findOne({email});
        
        if(!user){
            return res.status(401).json(
                {
                    success:false,
                    message:"User is not registered"
                }
            )
        }

        const payload={
            id:user._id,
            email:user.email,
        }
       

        if(await bcrypt.compare(password,user.password)){
             const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'2h'});
             user=user.toObject();
             user.token=token;
             user.password=undefined;

             const options ={
                expiresIn:new Date(Date.now()+3000000),
                httpOnly:true,
             }

             res.cookie("token",token,options).status(200).json(
                {
                    success:true,
                    token,
                    user,
                    message:"User Logged In successfully"
                }
             )
        }else{
            return res.status(403).json({
                success:true,
                message:"Password Incorrect"

            })
        }
    } catch (error) {
       
        return res.status(500).json({
            success:false,
            message:"Login Failure"

        })
    }
}

exports.signOut=async(req,res)=>{

    try {
        res.clearCookie("token").json(
            {
                success:true,
                message:"Sign Out Successfully",
            }
        )
    } catch (error) {
        
         res.status(500).json({
            success:false,
            message:"Sign Out Unseccessfull"
         })
    }
  
}