import { Link } from 'react-router-dom';
import Navbar from './components/Navbar'
import './HomeScreen.css'

export default function HomeScreen() {
  return (
    <>
      <Navbar />  
      <div>
        <h1 className="mt-5 text-center">Title</h1>
        <p className="text-center">A community to talk about menstrual health</p>
        <Link className="d-flex justify-content-center" style={{textDecoration: 'none'}} to='/locator'>
          <button className="p-3">Join Our Community</button>
        </Link>
      </div>
      <div>
        <h2>1 in 10 college students in the U.S. experience period poverty or a lack of access to menstrual products when they need them.</h2>
      </div>
    </>
  )
}