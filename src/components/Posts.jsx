import './Posts.css'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, {useState, useEffect} from 'react';
import { auth, db } from '../firebaseConfig';
import DeletePost from './DeletePost';
import { useAuthState } from 'react-firebase-hooks/auth';
import LikePost from './LikePost';
import { Link } from 'react-router-dom';

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [user] = useAuthState(auth)

  //fetches and listens for updates to posts
  useEffect(()=>{
    const postRef = collection(db, "Posts")
    //query to get posts in descending order by time
    const q = query(postRef, orderBy("createdAt", "desc"))
    //real-time listener for changes to the query
    onSnapshot(q, (snapshot)=>{
      const post = snapshot.docs.map((doc)=> ({
        id: doc.id,
        ...doc.data(),
      }));
      //update state with fetched posts
      setPosts(post)
      console.log(post)
    })
  },[]);
  
  return (
    <div>
      {
        posts.length === 0 ? ( /* checks how many posts there are */
          <p>No posts found!</p>
        ):(
          posts.map(({id, title, description, imageUrl, createdAt, createdBy, userId, likes, comments}) => (
            <div className='mb-3 p-2 bg-light postContainer' key={id}>
              <div className="row">
                <div className="col-3">
                  <Link to={`/post/${id}`}>
                    <img className="postImage" src = {imageUrl} alt = 'title'/>
                  </Link>
                </div>
                <div className="col-9 ps-3">
                  <div className="row">
                    <div className="col-6">
                      {createdBy && (
                        <span className="postAuthor">{createdBy}</span>
                      )}
                    </div>
                    <div className="col-6 d-flex flex-row-reverse">
                      {
                        user && user.uid === userId && (
                          <DeletePost id={id} imageUrl={imageUrl}/>
                        )
                      }
                    </div>
                  </div>
                  <h3 className="postTitle">{title}</h3>
                  <p className="postDate">{createdAt.toDate().toDateString()}</p>
                  <p className="postDescript">{description}</p>

                  <div className="d-flex flex-row-reverse">
                    {user && <LikePost id={id} likes={likes} />}
                    <div className="pe-2">
                      <p class="postLikes">{likes?.length} likes</p>
                    </div>
                    {
                      comments && comments.length > 0 && (
                        <div className="pe-2">
                          <p class="postComments">{comments?.length} comments</p>
                        </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        ))
      }
    </div>
  )
}