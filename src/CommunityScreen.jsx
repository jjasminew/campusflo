import './CommunityScreen.css'
import Posts from './components/Posts'
import AddPost from './components/AddPost'
import Navbar from './components/Navbar'

export default function CommunityScreen() {
  return (
    <div className="container">
      <Navbar />
      <div className="row">
        <div className='col-md-8'>
          <Posts />
        </div>
        <div className='col-md-4'>
          <AddPost />
        </div>
      </div>
    </div>
  )
}