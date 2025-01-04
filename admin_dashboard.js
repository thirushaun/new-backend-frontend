// Initialize Firebase Firestore
import { getFirestore, collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

// Initialize Firestore database
const db = getFirestore();

// Fetch appointments from Firestore
async function fetchAppointments() {
    const querySnapshot = await getDocs(collection(db, "appointments"));
    const appointmentsBody = document.getElementById('appointmentsBody');

    // Loop through each document in the appointments collection
    querySnapshot.forEach((doc) => {
        const appointment = doc.data();
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${appointment.name}</td>
            <td>${appointment.service}</td>
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
            <td>
                <button onclick="deleteAppointment('${doc.id}')">Delete</button>
            </td>
        `;
        appointmentsBody.appendChild(tr);
    });
}

// Delete appointment from Firestore
async function deleteAppointment(id) {
    try {
        await deleteDoc(doc(db, "appointments", id));
        alert("Appointment deleted successfully.");
        location.reload(); // Reload the page to reflect changes
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}

// Fetch appointments on page load
fetchAppointments();
