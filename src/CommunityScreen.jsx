import './CommunityScreen.css';
import Posts from './components/Posts';
import AddPost from './components/AddPost';
import Navbar from './components/Navbar';
import SideNavbar from './components/SideNavbar'

export default function CommunityScreen() {
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto px-0">
            <SideNavbar />
          </div>
          <div className="row">
            <div className='col-auto addpost-container'>
              <AddPost />
            </div>
            <div className='col-md-7 mt-3 scrollable-posts posts-container'>
              <Posts />
            </div>
          </div>
        </div>
      </div>
    </>
  ) 
}