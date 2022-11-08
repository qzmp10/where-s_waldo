// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKt94mw4ouUbNJTathSNW9dfk-tlOAiTg",
  authDomain: "where-s-waldo-a693a.firebaseapp.com",
  projectId: "where-s-waldo-a693a",
  storageBucket: "where-s-waldo-a693a.appspot.com",
  messagingSenderId: "969792223374",
  appId: "1:969792223374:web:af0dfffba49ca2cd1431df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);