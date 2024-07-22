import './LogInScreen.css'
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from './components/Navbar'


export default function LogInScreen(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  
  const handleLogIn = async()=>{
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/locator');
    } catch (error) {
      toast(error.code, {type:'error'});
    }
  }
  
  return(
    <div>
      <Navbar />
      <div className="d-flex justify-content-center">
        <div className='border p-4 m-4 bg-light loginContainer'>
          <h1>Log In</h1>
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
          <button className='submitBtn' onClick={handleLogIn}>Log In</button>
          <p className='signUp'>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
        </div>
      </div>
    </div>
  )
}