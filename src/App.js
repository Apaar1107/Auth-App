import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Pages/Home';
import {Toaster} from 'react-hot-toast';
import About from './Components/Pages/About';
import SignIn from './Components/Pages/Signin'
import SignUp from './Components/Pages/Signup'
import Profile from './Components/Pages/Profile';
import Header from './Components/Header';
import { PrivateRoute } from './Components/privateRoute';
function App() {
  return (
    <div>
       <Toaster/>
    <BrowserRouter>
        

        <Header/>
        <Routes>
          
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            
            <Route element={<PrivateRoute/>}>
              <Route path='/profile' element={<Profile/>}/>
            </Route>
            
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
