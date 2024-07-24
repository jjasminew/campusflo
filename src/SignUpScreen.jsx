import './SignUpScreen.css'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from './firebaseConfig'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import Navbar from './components/Navbar'

export default function SignUpScreen(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  let navigate = useNavigate();

  const handleSignUp = async()=>{
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser,{displayName:name});
      navigate('/locator');
    } catch (error) {
      toast(error.code, {type:'error'});
    }
  }
  
  return(
    <div>
      <Navbar />
      <div className="d-flex justify-content-center">
        <div className='border p-4 m-4 bg-light signupContainer'>
          <h1>Sign Up</h1>
          <div className='form-group inputArea'>
            <label>Name</label>
            <input 
              type="text"
              className="form-control"
              placeholder="Enter your name"
              onChange={(e)=>{setName(e.target.value)}}
            />
          </div>
          
          <div className='form-group inputArea'>
            <label>Email</label>
            <input 
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          
          <div className='form-group inputArea'>
            <label>Password</label>
            <input 
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          <br/>
          <button className='submitBtn' onClick={handleSignUp}>Sign Up</button>
          <p className='logIn'>Already have an account? <Link to='/login'>Log In</Link></p>
          <p className='logIn'><Link to='/locator'>Continue as Guest</Link></p>
        </div>
      </div>
    </div>
  )
}