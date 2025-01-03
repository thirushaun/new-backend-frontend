// Import the functions you need from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your web app's Firebase configuration
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
const db = getFirestore(app);
