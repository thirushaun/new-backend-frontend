// firebase.js

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCfagQ1fcsslhZ33xm1QBqGOYO_JsqEkeg",
    authDomain: "medivironap.firebaseapp.com",
    projectId: "medivironap",
    storageBucket: "medivironap.firebasestorage.app",
    messagingSenderId: "440212618885",
    appId: "1:440212618885:web:11e85acba754ea9fd273ec",
    measurementId: "G-0ZTM2WNX7M"
};

// Import the Firebase SDK
import firebase from "firebase/app";
import "firebase/firestore"; // This imports Firestore

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a Firestore instance
const db = firebase.firestore();

// Export db instance for use elsewhere
export { db };
