// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqtKCvJWLKDuISdVMwb5mt7DGTsTGmygM",
  authDomain: "gotcha-48634.firebaseapp.com",
  projectId: "gotcha-48634",
  storageBucket: "gotcha-48634.firebasestorage.app",
  messagingSenderId: "650287365434",
  appId: "1:650287365434:web:a0723a658e22a886e72403"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };