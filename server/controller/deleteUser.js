const User=require("../models/user");

exports.deleteUser=async(req,res)=>{
  
        if(req.user.id!==req.params.id){
            return res.status(401).json({
                success:false,
                message:`You can  delete only your  account`
            })
        }
        try {

         const deletedAccount= await User.findByIdAndDelete(req.params.id);
         
         res.status(200).clearCookie("token").json({
            success:true,
            message:"Account deleted successfully",
            deletedAccount
         })
    } catch (error) {
        
        res.status(500).json({
            success:false,
            message:"Account not deleted"
        })
    }
}