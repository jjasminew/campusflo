import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, {useState, useEffect} from 'react'
import { db } from '../firebaseConfig'
import DeletePost from './DeletePost'

export default function Posts() {
  const [posts, setPosts] = useState([])

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
          <p>No articles found!</p>
        ):(
          posts.map(({id, title, description, imageUrl, createdAt}) => (
            <div className='border mt-3 p-3 bg-light' key={id}>
              <div className="row">
                <div className="col-3">
                  <img src = {imageUrl} alt = 'title' style={{height:180, width:180}}/>
                </div>
                <div className="col-9 ps-3">
                  <h2>{title}</h2>
                  <p>{createdAt.toDate().toDateString()}</p>
                  <h4>{description}</h4>
                  <DeletePost id={id} imageUrl={imageUrl}/>
                </div>
              </div>
            </div>
          )
        ))
      }
    </div>
  )
}