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
            <td>${appointment.status || "Pending"}</td>
            <td>
                <button onclick="markAsDone('${doc.id}')">Mark as Done</button>
                <button onclick="deleteAppointment('${doc.id}')">Delete</button>
            </td>
        `;

        appointmentsBody.appendChild(tr);
    });
}

async function markAsDone(id) {
    try {
        await firebase.firestore().collection('appointments').doc(id).update({
            status: "Done"
        });
        alert("Appointment marked as Done.");
        location.reload(); // Refresh the page
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

async function deleteAppointment(id) {
    try {
        await firebase.firestore().collection('appointments').doc(id).delete();
        alert("Appointment deleted.");
        location.reload(); // Refresh the page
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}

window.onload = fetchAppointments;
