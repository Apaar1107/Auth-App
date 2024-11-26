import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch,useSelector } from 'react-redux';
import  {signInStart, signInSuccess, signInFailure} from "./Redux/User/userSlice";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const OAuth = () => {
    const dispatch=useDispatch();
    const {error}=useSelector((state)=>state.user)
    
        let credentials;
        const navigate=useNavigate();
    const handleGoogleClick=async ()=>{
        try {

            const provider = new GoogleAuthProvider();
            const auth=getAuth(app);
            const result = await signInWithPopup(auth,provider);
             credentials={
                username:result.user.displayName,
                email:result.user.email,
                photoUrl:result.user.photoURL
            }
            

            try {
                dispatch(signInStart());
                const data=await axios.post(`http://localhost:4000/auth/google`,credentials,{withCredentials:true})

                dispatch(signInSuccess(data));
                navigate("/")
                
            } catch (error) {
                
                dispatch(signInFailure(error.message))
    
            }
            
        } catch (error) {
           
            dispatch(signInFailure(error))
        }

        
    }
  return (
    <div>
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 uppercase text-white p-3 rounded-xl hover:opacity-90'>Continue With Google</button>

    {error && <p className='text-red-500  text-center my-4'>{}</p>}
    </div>
  )
}
