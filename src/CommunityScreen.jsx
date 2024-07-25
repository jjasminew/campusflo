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
          <div className="col">
            <div className="row d-flex justify-content-center">
              <div className="col-12 col-md-4 mt-3 addpost-container">
                <AddPost /> 
                {/* component for adding a post  */}
              </div>
              <div className="col-12 col-md-7 mt-3 scrollable-posts posts-container">
                <Posts />
                {/* component for displaying all the posted posts  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) 
}