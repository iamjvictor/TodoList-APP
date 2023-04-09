// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCTuUiBvXuGKSD-cms3BU3t0FMsb17aW1Y",
  authDomain: "todo-ccfd9.firebaseapp.com",
  projectId: "todo-ccfd9",
  storageBucket: "todo-ccfd9.appspot.com",
  messagingSenderId: "484818228360",
  appId: "1:484818228360:web:bd38c3afa5e31975333b3d"
};

// Initialize Firebase
export const database = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(database);



