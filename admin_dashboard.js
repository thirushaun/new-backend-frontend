// admin_dashboard.js
import { db } from './firebase.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

async function fetchAppointments() {
    const querySnapshot = await getDocs(collection(db, "appointments"));
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
