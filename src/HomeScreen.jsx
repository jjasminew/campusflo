import { Link } from 'react-router-dom';
import Navbar from './components/Navbar'
import './HomeScreen.css'

export default function HomeScreen() {
  return (
    <>
      <Navbar />  
      <Link className="d-flex justify-content-center" style={{textDecoration: 'none'}} to='/locator'>
        <button className="mt-5 p-3">Join Our Community</button>
      </Link>
    </>
  )
}