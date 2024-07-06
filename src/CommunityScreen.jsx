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
          <div className="col-auto col-md-3 col-xl-2 px-0">
            <SideNavbar />
          </div>
          <div className="row">
            <div className='col-md-8'>
              <Posts />
            </div>
            <div className='col-md-4'>
              <AddPost />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}