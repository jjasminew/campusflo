import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import LikePost from './LikePost';
import Comment from './Comment';

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
    <div className="container border bg-light" style={{ marginTop: 70 }}>
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
                <h2>{post.title}</h2>
                <h5>Author: {post.createdBy}</h5>
                <div>Posted on: {post.createdAt.toDate().toDateString()}</div>
                <hr />
                <h4>{post.description}</h4>
                <div className='d-flex flex-row-reverse'>
                  {user && <LikePost id={id} likes={post.likes} />}
                  <div className="pe-2">
                    <p>{post.likes.length} likes</p>
                  </div>
                </div>
                {/* comment section */}
                <Comment id={post.id} />
              </div>
          </div>
        )
      }
    </div>
  )
}

