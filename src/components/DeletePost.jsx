import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { db, storage } from '../firebaseConfig'
import { toast } from 'react-toastify'
import { deleteObject, ref } from 'firebase/storage'

export default function DeletePost({id, imageUrl}){
  const handleDelete = async()=>{
    if(window.confirm("Are you sure you want to delete this post?")){
      try {
        //deletes the post from the database
        await deleteDoc(doc(db, "Posts", id));
        toast("Article deleted successfully", {type: "success"});
        const storageRef = ref(storage, imageUrl);
        //deletes the image from storage
        await deleteObject(storageRef);
      } catch (error) {
        toast("Error deleting article", {type: "error"});
        console.log(error);
      }
    }
  };
  
  return(
    <div>
      <i className = 'fa fa-times' 
        onClick={handleDelete}
        style={{cursor: "pointer"}}
      />
    </div>
  )
}