// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV3PGYb4-SkQKjIiOCdXHsAjCk5Rd2mD8",
  authDomain: "gotcha-2.firebaseapp.com",
  projectId: "gotcha-2",
  storageBucket: "gotcha-2.firebasestorage.app",
  messagingSenderId: "243715124107",
  appId: "1:243715124107:web:46f8acb573fcd296f01d8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { app, db };