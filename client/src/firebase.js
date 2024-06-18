// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "realestateproject-fca8a.firebaseapp.com",
  projectId: "realestateproject-fca8a",
  storageBucket: "realestateproject-fca8a.appspot.com",
  messagingSenderId: "449977066215",
  appId: "1:449977066215:web:7513c51b413428ad72b842"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

