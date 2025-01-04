// Import the necessary Firebase functions from firebase.js
import { db } from './firebase'; // Import the initialized Firebase db
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

// Initialize Firestore instance
// The db instance is already initialized and exported from firebase.js

// Fetch appointments from Firestore
async function fetchAppointments() {
    try {
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
    } catch (error) {
        console.error('Error fetching appointments: ', error);
    }
}

// Mark an appointment as done
function markAsDone(id) {
    const appointmentRef = doc(db, "appointments", id);
    // Update status to "done"
    updateDoc(appointmentRef, {
        status: "Done"
    })
    .then(() => {
        alert('Appointment marked as done.');
        location.reload(); // Reload to reflect changes
    })
    .catch((error) => {
        console.error('Error marking appointment as done: ', error);
    });
}

// Delete an appointment
function deleteAppointment(id) {
    const appointmentRef = doc(db, "appointments", id);
    // Delete the document from Firestore
    deleteDoc(appointmentRef)
    .then(() => {
        alert('Appointment deleted.');
        location.reload(); // Reload to reflect changes
    })
    .catch((error) => {
        console.error('Error deleting appointment: ', error);
    });
}

// Call this function when the page loads to fetch appointments
window.onload = fetchAppointments;
