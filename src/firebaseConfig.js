// Import the functions you need from the SDKs you need
// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUtsCQ819mkan59kOA8iGpiekr72dxNMk",
  authDomain: "bhc123-2ee17.firebaseapp.com",
  databaseURL: "https://bhc123-2ee17-default-rtdb.firebaseio.com",
  projectId: "bhc123-2ee17",
  storageBucket: "bhc123-2ee17.firebasestorage.app",
  messagingSenderId: "27488843983",
  appId: "1:27488843983:web:c4d4c9f97030b748551fba",
  measurementId: "G-LCL5JTGEP5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

export { db, collection, getDocs, doc, getDoc ,updateDoc};