// Import necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export Firestore db instance for use in other files
export { db };
