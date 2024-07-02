import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function Navbar(){
  const [user] = useAuthState(auth)
  
  return(
    <div>
      <nav className='navbar'>
        <div>
          <img src='favicon.svg' width={30} alt="logo" className='mg-5'/>
        </div>
        <Link className='nav-link' to='/'>Home</Link>
        <div>
          {
            user &&(
              <>
                <span className='pe-4'>
                  Signed in as {user.displayName || user.email}
                </span>
                <button className='btn btn-primary btn-sm me-3' onClick={()=>{signOut(auth)}}>Logout</button>
              </>
            )
          }
        </div>
        
      </nav>
    </div>
  )
}