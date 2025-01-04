import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Your Firebase configuration (same as in firebase.js)
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

// Fetch appointments from Firestore
async function fetchAppointments() {
    const querySnapshot = await getDocs(collection(db, "appointments"));
    const appointmentsBody = document.getElementById('appointmentsBody');
    
    querySnapshot.forEach((doc) => {
        const appointment = doc.data();
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${appointment.name}</td>
            <td>${appointment.service}</td>
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
            <td>
                <button onclick="markAsDone('${doc.id}')">Mark as Done</button>
                <button onclick="deleteAppointment('${doc.id}')">Delete</button>
            </td>
        `;
        appointmentsBody.appendChild(tr);
    });
}

// Call the fetchAppointments function when the page loads
window.onload = fetchAppointments;
