import { useSelector,useDispatch } from 'react-redux'
import { useState } from 'react';
import {  toast } from 'react-hot-toast';
import axios from 'axios';
import  {signInStart, signInSuccess, signInFailure,deleteSuccess} from "../Redux/User/userSlice";


export default function Profile() {

  const [formData,setFormData]=useState({});
  const {currentUser,error,loading}=useSelector((state)=>state.user);
  const dispatch=useDispatch();



  const changeHandle=(e)=>{
    setFormData({...formData, [e.target.id]:e.target.value})
    
   }

  
  const handleUpdateProfile=async (e)=>{
          e.preventDefault();

          try {
        
        dispatch(signInStart());
        const data= await axios.post(`http://localhost:4000/auth/updateUser/${currentUser.data.user._id}`,formData,{withCredentials:true})
        dispatch(signInSuccess(data));
        toast.success("user Updated Successfully")
          
          
         } catch (error) {

          dispatch(signInFailure(error.response.data))
          

         }
  }

     const handledeleteAccount=async()=>{
        try {
          dispatch(signInStart())
           await axios.delete(`http://localhost:4000/auth/deleteUser/${currentUser.data.user._id}`,{withCredentials:true})
            dispatch(deleteSuccess())
            toast.success("Deleted Successfully")
        } catch (error) {
          dispatch(signInFailure(error.response.data))
          
          
        }
     }
  
  const handleSignOut=async()=>{

    try {
      dispatch(signInStart())
      await axios.get(`http://localhost:4000/auth/signout`,{withCredentials:true})
      dispatch(deleteSuccess())
    } catch (error) {

      dispatch(signInFailure(error.response.data))
          
      
    }
 
  }
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
          <h1 className='font-semibold text-center my-7 text-3xl'>Profile</h1>

          <form className='flex flex-col gap-4'>
             

             <img src={currentUser.data.user.profilePicture} 
             alt="User"
             className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2' 
            
             />

             <input type="text"
              id='username' 
              placeholder='Username' className='bg-slate-100 rounded-lg p-3'
              defaultValue={currentUser.data.user.username}
              onChange={changeHandle}
              />

             <input type="email" 
             id='email'  
             placeholder='Email' 
             className='bg-slate-100 rounded-lg p-3'
             defaultValue={currentUser.data.user.email}
             onChange={changeHandle}
             />

             <input type="password" 
             id='password'  
             placeholder='Password' className='bg-slate-100 rounded-lg p-3'
             onChange={changeHandle}
             />

             {error && <p className='text-red-500 text-center'>{error.message}</p>}

             <button onClick={handleUpdateProfile} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
             {loading ?"Loading":"Update"} 
             </button>
          </form>

          <div className='flex justify-between mt-4'>
            <span className='text-red-700 cursor-pointer' onClick={handledeleteAccount}>Delete Account</span>

            <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>Sign Out</span>
          </div>

    </div>
  )
}
