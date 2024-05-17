// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAO9ogKCXH8xXllbTU30FiS1hHnTBKX5V8",
  authDomain: "next-login-c10d9.firebaseapp.com",
  projectId: "next-login-c10d9",
  storageBucket: "next-login-c10d9.appspot.com",
  messagingSenderId: "446037161342",
  appId: "1:446037161342:web:04e8d359d5c0ba97806f2f",
  measurementId: "G-C9Y3XQ6QNC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 

export default app;
