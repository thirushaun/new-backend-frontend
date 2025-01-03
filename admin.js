// Firebase Firestore Initialization
const db = firebase.firestore();

// Get all appointments from Firestore and display in table
db.collection("appointments").get().then((querySnapshot) => {
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

        document.querySelector('#appointmentsTable tbody').appendChild(tr);
});

// Mark an appointment as done
function markAsDone(id) {
    db.collection("appointments").doc(id).update({
        status: "Done"
    }).then(() => {
        alert("Appointment marked as Done.");
        location.reload(); // Refresh the page to reflect changes
    }).catch((error) => {
        console.error("Error updating document: ", error);
    });
}

// Delete an appointment
function deleteAppointment(id) {
    db.collection("appointments").doc(id).delete().then(() => {
        alert("Appointment deleted.");
        location.reload(); // Refresh the page to reflect changes
    }).catch((error) => {
        console.error("Error deleting document: ", error);
    });
}
