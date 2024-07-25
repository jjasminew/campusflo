import './Navbar.css'
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import logo from '../assets/logo.png';

export default function Navbar(){
  //holds if user is logged in or not
  const [user] = useAuthState(auth)
  
  return(
    <div>
      <nav className='navbar p-3' style={{backgroundColor: '#F7DCDC'}}>
        <div>
          <Link to='/'>
            <img src={logo} width={50} alt="logo"/>
          </Link>
        </div>
        <div>
          {
            !user?
            <>
              <Link style={{textDecoration: 'none'}} to='/login'><div className='loginBtn'>Login</div></Link>
            </>
            :<>
              <span className='signedInTxt pe-4'>
                  Signed in as {user.displayName || user.email}
                </span>
                <button className='logoutBtn' onClick={()=>{signOut(auth)}}>Logout</button>
            </>   
          }
        </div>
      </nav>
    </div>
  )
}