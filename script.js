// script.js
import { db } from './firebase.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

document.getElementById('appointmentForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (!name || !email || !phone || !service || !date || !time) {
        alert("Please fill out all fields.");
        return;
    }

    try {
        const docRef = await addDoc(collection(db, "appointments"), {
            name,
            email,
            phone,
            service,
            date,
            time
        });
        console.log("Appointment booked with ID: ", docRef.id);
        alert("Appointment booked successfully!");
        document.getElementById('appointmentForm').reset(); // Clear the form
    } catch (error) {
        console.error("Error booking appointment: ", error);
        alert("An error occurred. Please try again.");
    }
});
