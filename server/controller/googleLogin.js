const User =require("../models/user")
const jwt=require('jsonwebtoken')
const bcrypt=require("bcrypt");
exports.googleLogin =async(req,res)=>{
    try {
    
        const {email, username,photoUrl}=req.body;
        let user=await User.findOne({email});
        
        
        if(user){

            const payload={
                id:user._id,
                email:user.email,
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'2h'});
            user=user.toObject();
            user.token=token;
            user.password=undefined;

            const options ={
                expiresIn:new Date(Date.now()+3000000),
                httpOnly:true,
             }

             return res.cookie("token",token,options).status(200).json(
                {
                    success:true,
                    token,
                    user,
                    message:"User Logged In successfully"
                }
             )
        }else{

            const generatedPassword=Math.random.toString(36).slice(-8)+Math.random.toString(36).slice(-8);

            let hashedPassword;

            try {
                 
             hashedPassword=await bcrypt.hash(generatedPassword,10);
            } catch (error) {
                return res.status(500).json(
                 {
                     success:false,
                     message:"Issue in hashing password"
                 }
                )
            }
     
            let user =await User.create({username, email, password:hashedPassword,profilePicture:photoUrl});

           

            const payload={
                id:user._id,
                email:user.email,
            }
     
            const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'2h'});
            user=user.toObject();
            user.token=token;
            user.password=undefined;

            const options ={
                expiresIn:new Date(Date.now()+3000000),
                httpOnly:true,
             }

            return res.cookie("token",token,options).status(200).json(
                {
                    success:true,
                    token,
                    user,
                    message:"User Logged In successfully"
                }
             )

        }

         
        
    } catch (error) {
       
        return res.status(500).json({
            success:false,
            message:"Login Failure"

        })
    }
}