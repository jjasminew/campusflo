import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LogInScreen(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();
  
  const handleLogIn = async()=>{
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      toast(error.code, {type:'error'});
    }
  }
  
  return(
    <div className='border p-3 bg-light mx-auto'>
      <h1>Login</h1>
      <div className='form-group'>
        <label>Email</label>
        <input 
          type="email"
          className="form-control"
          placeholder="Enter your email"
          onChange={(e)=>{setEmail(e.target.value)}}
        />
      </div>

      <div className='form-group'>
        <label>Password</label>
        <input 
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e)=>{setPassword(e.target.value)}}
        />
      </div>
      <br/>
      <button className='btn btn-primary' onClick={handleLogIn}>Log In</button>
    </div>
  )
}