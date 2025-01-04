async function fetchAppointments() {
    const querySnapshot = await firebase.firestore().collection('appointments').get();
    const appointmentsBody = document.getElementById('appointmentsBody');

    querySnapshot.forEach((doc) => {
        const appointment = doc.data();
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${appointment.name}</td>
            <td>${appointment.service}</td>
            <td>${appointment.date}</td>
            <td>${appointment.time}</td>
        `;

        appointmentsBody.appendChild(row);
    });
}

window.onload = fetchAppointments;
