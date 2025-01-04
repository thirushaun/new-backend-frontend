// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfagQ1fcsslhZ33xm1QBqGOYO_JsqEkeg", // Your API Key
  authDomain: "medivironap.firebaseapp.com",  // Your authDomain
  projectId: "medivironap",                  // Your Project ID
  storageBucket: "medivironap.appspot.com",   // Your storageBucket
  messagingSenderId: "440212618885",         // Your messagingSenderId
  appId: "1:440212618885:web:11e85acba754ea9fd273ec", // Your appId
  measurementId: "G-0ZTM2WNX7M"             // Your measurementId
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore db instance for use in other files
export { db };
