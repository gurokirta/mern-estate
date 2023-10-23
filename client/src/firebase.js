// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-255c3.firebaseapp.com",
  projectId: "mern-estate-255c3",
  storageBucket: "mern-estate-255c3.appspot.com",
  messagingSenderId: "149164113245",
  appId: "1:149164113245:web:7146c3b294717978affcb4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
