// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIeBc--rS4UUf6-7v5NAyGTv8I1tvYkz8",
  authDomain: "shopping-share-cd16b.firebaseapp.com",
  projectId: "shopping-share-cd16b",
  storageBucket: "shopping-share-cd16b.firebasestorage.app",
  messagingSenderId: "939851820023",
  appId: "1:939851820023:web:0a1efef373f1e72f7f9cf2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)