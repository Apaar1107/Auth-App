import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function Header() {
  const {currentUser} =useSelector((state)=>state.user)
  
  return (
    <div className='bg-slate-200'>
         <div className='flex justify-between max-w-6xl mx-auto items-center p-3'>
           <Link to='/'>  <h1 className='font-bold'>  Auth App</h1></Link> 
            <ul className='flex gap-4'> 
             <Link to="/"><li>Home</li></Link> 
             <Link to="/about"><li>About</li></Link> 
               
             <Link to="/profile">
             {currentUser? ( <img className='rounded-full h-7 w-7 object-cover' referrerpolicy="no-referrer" src={`${currentUser.data.user.profilePicture}`} alt="User" />  ):  <li>SignIn</li> }
             </Link>
             

                
            </ul>
         </div>
    </div>
  )
}
