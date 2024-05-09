// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBeg9rYEaSTa1HcgsssRDyVTmaDpWIoZOM",
  authDomain: "online-booking-osad.firebaseapp.com",
  projectId: "online-booking-osad",
  storageBucket: "online-booking-osad.appspot.com",
  messagingSenderId: "858019033519",
  appId: "1:858019033519:web:2b88e0c64e604f02057f5a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
