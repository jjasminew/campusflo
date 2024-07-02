import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB_5uJdI005_BPtXn9-6yvowNnjfBVwX7c",
  authDomain: "kwk-deloitte.firebaseapp.com",
  projectId: "kwk-deloitte",
  storageBucket: "kwk-deloitte.appspot.com",
  messagingSenderId: "1004751061389",
  appId: "1:1004751061389:web:efb3c9788a828f86bbfdc4"
};

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)
export const db = getFirestore(app)