const express=require('express');

 const router =express.Router();

 const {signin}=require('../controller/auth');
 const {login}=require('../controller/auth');
 const {signOut}=require('../controller/auth');
 const {googleLogin}=require("../controller/googleLogin");
 const{userVerification}=require("../middleware/userVerification");
 const {updateUser}=require("../controller/updateUser");
 const {deleteUser}=require("../controller/deleteUser");

 router.post("/signup",signin);
 router.post("/signin",login);
 router.post("/google",googleLogin);
 router.get("/signout",signOut);
 router.post('/updateUser/:id',userVerification,updateUser);
 router.delete('/deleteUser/:id',userVerification,deleteUser);

 module.exports=router;