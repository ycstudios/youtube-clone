import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqhMIJgCBg4jPm6N5aFIdEZfuYUm1JehQ",
  authDomain: "fir-5918e.firebaseapp.com",
  projectId: "fir-5918e",
  storageBucket: "fir-5918e.firebasestorage.app",
  messagingSenderId: "846993186836",
  appId: "1:846993186836:web:6b193a7e3d97eb06a88701",
  measurementId: "G-XNKC7HQGG4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
