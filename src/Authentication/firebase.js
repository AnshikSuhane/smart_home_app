// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsFXihxDk0a_jhAG98xRKh7Uw5z8jBZE8",
  authDomain: "smart-home-application-6cce4.firebaseapp.com",
  databaseURL: "https://smart-home-application-6cce4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-home-application-6cce4",
  storageBucket: "smart-home-application-6cce4.firebasestorage.app",
  messagingSenderId: "624627653108",
  appId: "1:624627653108:web:70d57fbf740c7eaa68c1a1",
  measurementId: "G-EWBT5QJ07L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth=getAuth()
 const db=getFirestore(app)
 const storage=getStorage(app)
 export {auth,db,storage}
export default app
