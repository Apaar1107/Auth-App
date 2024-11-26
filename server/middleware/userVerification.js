const jwt=require("jsonwebtoken");

exports.userVerification =async (req,res,next)=>{
    try {
       
       const  {token}=req.cookies;

       if(!token){
        return res.status(401).json({
             success:false,
             message:"Token Missing",
        })
       }

       try {
           const decode=jwt.verify(token,process.env.JWT_SECRET);
           req.user=decode;
          
       } catch (error) {

       
        return res.status(401).json({
            success:false,
            message:"Invalid Token",

        })  
       }

       next();

    } catch (error) {
      
        return res.status(500).json({
            success:false,
            message:"Something went wrong, while verify the token"
        })
    }
}