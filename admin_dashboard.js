async function fetchAppointments() {
    const db = firebase.firestore();
    const querySnapshot = await db.collection('appointments').get();
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

// Mark an appointment as done
function markAsDone(id) {
    const db = firebase.firestore();
    const appointmentRef = db.collection('appointments').doc(id);

    appointmentRef.update({ status: 'Done' })
        .then(() => {
            alert("Appointment marked as Done.");
            location.reload(); // Refresh the page to reflect changes
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
}

// Delete an appointment
function deleteAppointment(id) {
    const db = firebase.firestore();
    const appointmentRef = db.collection('appointments').doc(id);

    appointmentRef.delete()
        .then(() => {
            alert("Appointment deleted.");
            location.reload(); // Refresh the page to reflect changes
        })
        .catch((error) => {
            console.error("Error deleting document: ", error);
        });
}

// Fetch and display appointments on page load
window.onload = fetchAppointments;
