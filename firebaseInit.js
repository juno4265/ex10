// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAs46F86N5yvGnFl93gT0uSCeKZNr2AGY8",
  authDomain: "ex10-7f599.firebaseapp.com",
  projectId: "ex10-7f599",
  storageBucket: "ex10-7f599.appspot.com",
  messagingSenderId: "918276767386",
  appId: "1:918276767386:web:e116e62af60a7833342923",
  measurementId: "G-WC8LJ4YG7K",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
