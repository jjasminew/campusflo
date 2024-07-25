import './Comment.css'
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { v4 as uuidv4 } from 'uuid';

export default function Comment({ id }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [currentlyLoggedinUser] = useAuthState(auth);
  const commentRef = doc(db, "Posts", id);

  useEffect(() => {
    const docRef = doc(db, "Posts", id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data()?.comments || []);
    });
  }, [id]);

  // add a comment function if user is logged in and presses enter
  const handleChangeComment = (e) => {
    if (e.key === "Enter" && currentlyLoggedinUser) {
      updateDoc(commentRef, {
        comments: arrayUnion({
          user: currentlyLoggedinUser.uid,
          userName: currentlyLoggedinUser.displayName,
          comment: comment,
          createdAt: new Date(),
          commentId: uuidv4()
        })
      }).then(() => {
        setComment("");
      });
    }
  };

  // delete comment function
  const handleDeleteComment = (comment) => {
    if (currentlyLoggedinUser && comment.user === currentlyLoggedinUser.uid) {
      updateDoc(commentRef, {
        comments: arrayRemove(comment),
      })
      .then((e) => {
        console.log(e);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  return (
    <div className="commentTitle">
      Comments
      <div>
        {comments.length > 0 ? (
          comments.map(({ commentId, user, comment, userName, createdAt }) => (
            <div key={commentId}>
              <div className="p-2 mt-2 row commentBox">
                <div className="col-11">
                  <span 
                    className={`p-1 ${
                      currentlyLoggedinUser && user === currentlyLoggedinUser.uid ? "loginBadge" : "logoutBadge"
                    }`}
                  >
                    {userName}
                  </span>
                  {comment}
                </div>
                <div className="col-1">
                  {currentlyLoggedinUser && user === currentlyLoggedinUser.uid && (
                    <i 
                      className="fa fa-times" 
                      style={{ cursor: "pointer" }} 
                      onClick={() => handleDeleteComment({ commentId, user, comment, userName, createdAt })}
                    ></i>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
        {currentlyLoggedinUser && (
          <input 
            type='text' 
            className="form-control mt-4 mb-5" 
            value={comment} 
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            onKeyUp={(e) => handleChangeComment(e)}
          />
        )}
      </div>
    </div>
  );
}
