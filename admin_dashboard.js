import { getFirestore, collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Initialize Firebase Firestore
const db = getFirestore();

// Fetch appointments from Firebase
async function fetchAppointments() {
    const querySnapshot = await getDocs(collection(db, "appointments"));
    const appointmentsBody = document.getElementById('appointmentsBody');
    
    querySnapshot.forEach((doc) => {
        const appointment = doc.data();
        const tr = document.createElement("tr");
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

// Mark appointment as done
function markAsDone(id) {
    console.log(`Marking appointment ${id} as done`);
    // Update the Firestore document to mark as done if necessary
}

// Delete appointment
async function deleteAppointment(id) {
    console.log(`Deleting appointment ${id}`);
    await deleteDoc(doc(db, "appointments", id));
    fetchAppointments(); // Reload appointments
}

fetchAppointments(); // Call function to fetch appointments
