import { getFirestore, collection, getDocs, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';
import { firebaseApp } from './firebase.js';  // Import the initialized Firebase app

const db = getFirestore(firebaseApp); // Initialize Firestore instance

// Fetch appointments from Firebase
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
}

// Mark an appointment as done
function markAsDone(id) {
    const appointmentRef = doc(db, "appointments", id);
    updateDoc(appointmentRef, { status: 'Done' }).then(() => {
        alert("Appointment marked as Done.");
        location.reload(); // Refresh the page to reflect changes
    }).catch((error) => {
        console.error("Error updating document: ", error);
    });
}

// Delete an appointment
function deleteAppointment(id) {
    const appointmentRef = doc(db, "appointments", id);
    deleteDoc(appointmentRef).then(() => {
        alert("Appointment deleted.");
        location.reload(); // Refresh the page to reflect changes
    }).catch((error) => {
        console.error("Error deleting document: ", error);
    });
}

// Fetch and display appointments on page load
window.onload = fetchAppointments;
