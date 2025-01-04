// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfagQ1fcsslhZ33xm1QBqGOYO_JsqEkeg",
  authDomain: "medivironap.firebaseapp.com",
  projectId: "medivironap",
  storageBucket: "medivironap.firebasestorage.app",
  messagingSenderId: "440212618885",
  appId: "1:440212618885:web:11e85acba754ea9fd273ec",
  measurementId: "G-0ZTM2WNX7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
const db = getFirestore(app);

export { app, db }; // Export the app and db for use in other files
