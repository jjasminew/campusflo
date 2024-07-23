import './AddPost.css'
import React, { useState } from 'react';
import { Timestamp, collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, db, auth } from './../firebaseConfig';
import { toast } from "react-toastify";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

export default function AddPost() {
  const [user] = useAuthState(auth);
  
  // initializing form data state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });

  //tracking process of uploading the image
   const [progress, setProgress] = useState(0);

  //updates every value in the form when post is submitted
  const handleChange=(e)=>{
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  //updates image change
  const handleImageChange=(e)=>{
    setFormData({...formData, image:e.target.files[0]});
  };

  //handles form submission
  const handleSubmit=()=>{
    //checks if all fields are filled
    if(!formData.title || !formData.description || !formData.image){
      alert('Please fill all the fields');
      return;
    }
    
    const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);

    //uploading the image
    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    //handle state changes during the upload
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        //calculate the upload progress percentage
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        //catches error in upload
        console.log(err);
      },
      () => {
        //reset form data once upload is complete
        setFormData({
          title: "",
          description: "",
          image: "",
        });

        //gets the downloadURL and sees if the promise is fulfilled, if so, then add new post and notif
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const postRef = collection(db, "Posts");
          //adding new post to the the Firestore database
          addDoc(postRef, {
            title: formData.title,
            description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            createdBy: user.displayName,
            userId: user.uid,
            likes:[],
            comments:[],
          })
            //sending notif that post was added successfully
            .then(() => {
              toast("Post added successfully", { type: "success" });
              setProgress(0);
            })
            //sending notif of an error
            .catch((err) => {
              toast("Error adding post", { type: "error" });
            });
        });
      }
    );
  }
  
  return (
    <div className='p-3 createContainer'>
      {
        !user?
        <>
          <h2>
            <Link className="loginPostTxt" to='/login'>Login to create a post</Link>
          </h2>
          <p className="signupPostTxt">Don't have an account? <Link to='/signup' className="signupPostTxt">Sign Up</Link></p>
        </>
        :<>
          <h2 className="createPostTxt">Create post</h2>
          <label htmlFor="" className="inputTxt">Title</label>
          <input 
            type="text" 
            name="title" 
            className="form-control inputAlign" 
            value={formData.title}
            onChange={(e)=>handleChange(e)}
          />

          {/* description */}
          <label htmlFor="" className="inputTxt">Description</label>
          <textarea 
            name="description" 
            className="form-control inputAlign" 
            value={formData.description}
            onChange={(e)=>handleChange(e)}
          />

          {/* image */}
          <label htmlFor="" className="inputTxt">Image</label>
          <input 
            type="file" 
            name="image" 
            accept="image/*" 
            className="form-control inputAlign"
            onChange={(e)=>handleImageChange(e)}
          />

          {/* image progress bar */}
          {progress === 0 ? null : (
            <div className="progress">
              <div
                className="progress-bar progress-bar-striped mt-2"
                style={{ width: `${progress}%` }}
              >
                {`uploading image ${progress}%`}
              </div>
            </div>
          )}

          {/* submit button */}
          <button 
            className="form-control btn-primary mt-2" 
            onClick={handleSubmit}
          >
            Submit
          </button>
        </>
      }
    </div>
  )
}