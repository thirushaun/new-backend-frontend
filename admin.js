// Firebase Firestore Initialization
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { app } from './firebase';  // Make sure to export the initialized Firebase app from your firebase.js file

const db = getFirestore(app); // Using getFirestore with the initialized Firebase app

// Get all appointments from Firestore and display in table
async function loadAppointments() {
    const querySnapshot = await getDocs(collection(db, "appointments"));
    querySnapshot.forEach((docSnapshot) => {
        const appointment = docSnapshot.data();
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${appointment.name}</td>
            <td>${appointment.service}</td>
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
            <td>
                <button onclick="markAsDone('${docSnapshot.id}')">Mark as Done</button>
                <button onclick="deleteAppointment('${docSnapshot.id}')">Delete</button>
            </td>
        `;

        document.querySelector('#appointmentsTable tbody').appendChild(tr);
    });
}

loadAppointments(); // Call the function to load appointments

// Mark an appointment as done
async function markAsDone(id) {
    try {
        const appointmentRef = doc(db, "appointments", id);
        await updateDoc(appointmentRef, {
            status: "Done"
        });
        alert("Appointment marked as Done.");
        location.reload(); // Refresh the page to reflect changes
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

// Delete an appointment
async function deleteAppointment(id) {
    try {
        const appointmentRef = doc(db, "appointments", id);
        await deleteDoc(appointmentRef);
        alert("Appointment deleted.");
        location.reload(); // Refresh the page to reflect changes
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}
