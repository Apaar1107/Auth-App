import React, { useState } from 'react'
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom'
import {  toast } from 'react-hot-toast';
import { OAuth } from '../OAuth';
export default function SignUp() {
const [formData,setFormData]=useState({});
const [error,setError]=useState(null);
const [loading,setLoading]=useState(false);
const navigate=useNavigate();
  const changeHandle=(e)=>{
       setFormData({...formData, [e.target.id]:e.target.value})
       
      }
      
      const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
      setError(null)
      setLoading(true);
      const data= await axios.post(`http://localhost:4000/auth/signup`,formData,{withCredentials:true})
    
      toast.success("Signed Up Successfully")
      setLoading(false);
      navigate('/signin');
     
} catch (error) {
  setError(error.response.data)
  setLoading(false)
    
}



  }
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='font-semibold text-3xl text-center my-7'>SIGN UP</h1>
     {error && <div className='text-red-500 text-center my-4'>{error.message}</div>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" id='username' className='bg-slate-100 rounded-lg p-3' placeholder='Username' onChange={changeHandle}/>

        <input type="email" id='email' className='bg-slate-100 rounded-lg p-3' placeholder='Email' onChange={changeHandle}/>

        <input type="password" id='password' className='bg-slate-100 rounded-lg p-3' placeholder='Password' onChange={changeHandle}/>

        <button disabled={loading}  className='bg-slate-700 rounded-lg uppercase p-3 text-white hover:opacity-95 disabled:opacity-80'>  {(loading)?"loading":"Sign Up"}</button>
        <OAuth/>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/signin'><span className='text-blue-500'>Sign in</span></Link>
        
      </div>
    </div>
  )
}
