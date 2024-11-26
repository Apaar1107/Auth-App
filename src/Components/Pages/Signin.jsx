import React, { useState } from 'react'
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom'
import  {signInStart, signInSuccess, signInFailure} from "../Redux/User/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import { OAuth } from '../OAuth';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store,persistor } from '../Redux/store';

export default function SignIn() {
const [formData,setFormData]=useState({});

const dispatch=useDispatch();
const {loading, error}=useSelector((state)=>state.user)
const navigate=useNavigate();
  const changeHandle=(e)=>{
       setFormData({...formData, [e.target.id]:e.target.value})
       
      }
      
      const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
      dispatch(signInStart());
      console.log("form data",formData);
      const data= await axios.post(`http://localhost:4000/auth/signin`,formData,{withCredentials:true})
     
       
        dispatch(signInSuccess(data));
        navigate('/');
       
      
     
} catch (error) {
  
  dispatch(signInFailure(error.response.data))
    
}



  }
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='font-semibold text-3xl text-center my-7'>SIGN In</h1>
     {error && <div className='text-red-500 text-center my-4'>{error.message}</div>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        

        <input type="email" id='email' className='bg-slate-100 rounded-lg p-3' placeholder='Email' onChange={changeHandle}/>

        <input type="password" id='password' className='bg-slate-100 rounded-lg p-3' placeholder='Password' onChange={changeHandle}/>

        <button disabled={loading}  className='bg-slate-700 rounded-lg uppercase p-3 text-white hover:opacity-95 disabled:opacity-80'>  {(loading)?"loading":"Sign In"}</button>

        <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
        <OAuth/>
    
    </PersistGate>
  </Provider>
          
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Dont Have an account?</p>
        <Link to='/signup'><span className='text-blue-500'>Sign up</span></Link>
        
      </div>
    </div>
  )
}
