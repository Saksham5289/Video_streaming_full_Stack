
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOM__PqZl3TG6K-RIM8s9afW8mh-fxDbw",
  authDomain: "fir-6111b.firebaseapp.com",
  projectId: "fir-6111b",
  storageBucket: "fir-6111b.appspot.com",
  messagingSenderId: "957550338168",
  appId: "1:957550338168:web:e80719229c89f7a0888d8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider();

export default app;