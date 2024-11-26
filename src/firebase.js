// Import the functions you need from the SDKs you need
// import { configDotenv } from "dotenv";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-librariesdo
// Your web app's Firebase configuration

// require("dotenv").config();
const firebaseConfig = {
  apiKey: "AIzaSyC2pLfgDtRv8z9iShm7D_VTFA7aEr3CD8M",
  authDomain: "mern-auth-e7b1f.firebaseapp.com",
  projectId: "mern-auth-e7b1f",
  storageBucket:  "mern-auth-e7b1f.appspot.com",
  messagingSenderId: "888925190499",
  appId: "1:888925190499:web:8cf15b424ff0a66acc3b56"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

