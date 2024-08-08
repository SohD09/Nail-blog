// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nailedit-6db10.firebaseapp.com",
  projectId: "nailedit-6db10",
  storageBucket: "nailedit-6db10.appspot.com",
  messagingSenderId: "348345073038",
  appId: "1:348345073038:web:1d512cd14e92a51e26b8df",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
