// Import Firestore from firebase.js
import { db } from './firebase.js'; // Import the Firestore instance

// Ensure emailJS is initialized correctly
(function() {
    emailjs.init("rCVEgB2SShzE8epf1"); // Replace with your public key from EmailJS
})();

// Appointment form submission
document.getElementById('appointmentForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Validate input fields
    if (!name || !email || !phone || !service || !date || !time) {
        alert("Please fill out all the fields.");
        return;
    }

    // Send email via EmailJS using the provided template
    emailjs.send('service_mmd3jws', 'template_lraqztk', {
        to_name: name,
        to_email: email,
        service: service,
        date: date,
        time: time
    })
    .then(response => {
        console.log('Email sent successfully', response);
        alert('Appointment booked and email sent successfully!');

        // Save to Firestore in the 'AP' document
        saveAppointmentToFirestore({
            name: name,
            email: email,
            phone: phone,
            service: service,
            date: date,
            time: time
        });
    })
    .catch(error => {
        console.error('Error occurred:', error);
        alert('An error occurred while sending the email: ' + error.text);
    });
});

// Save Appointment Function
function saveAppointmentToFirestore(appointmentData) {
    // Ensure firebase is initialized
    const docRef = db.collection("appointments").doc("AP");

    docRef.set(appointmentData)
    .then(() => {
        console.log("Document written with ID: AP");
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
        alert("An error occurred while saving the appointment data: " + error.message);
    });
}
