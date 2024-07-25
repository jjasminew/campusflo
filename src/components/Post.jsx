import './Post.css'
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import LikePost from './LikePost';
import Comment from './Comment';
import Navbar from './Navbar';
import SideNavbar from './SideNavbar';

// the post page, when you click on an already posted post and want to read more
export default function Post() {
  const {id} = useParams();
  const [post, setPost] = useState(null);
  const [user] = useAuthState(auth)

  useEffect(()=>{
    const docRef = doc(db, "Posts", id)
    onSnapshot(docRef, (snapshot)=>{
      setPost({...snapshot.data(), id: snapshot.id});
    });
  }, []);
  
  return (
    <>
      <Navbar/>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto px-0">
            <SideNavbar />
          </div>
          <div className="col mx-5">
            <div className="row d-flex justify-content-center">
              <div className="container mt-5 p-4 postBox">
                {
                  post && (
                    <div className="row">
                      <div className="col-3">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          style={{ width: "100%", padding: 10 }}
                        />
                      </div>
                        <div className="col-9 mt-3">
                          <h2 className="post2Title">{post.title}</h2>
                          <h5 className="post2Author">Author: {post.createdBy}</h5>
                          <div className="post2Date">Posted on: {post.createdAt.toDate().toDateString()}</div>
                          <hr />
                          <h4 className="post2Txt">{post.description}</h4>
                          <div className='d-flex flex-row-reverse'>
                            {user && <LikePost id={id} likes={post.likes} />}
                            <div className="pe-2 post2Likes">
                              <p>{post.likes.length} likes</p>
                            </div>
                          </div>
                          {/* comment section */}
                          <Comment className="post2Comments" id={post.id} />
                        </div>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

