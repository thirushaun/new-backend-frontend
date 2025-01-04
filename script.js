// Ensure emailJS is initialized correctly
(function () {
    emailjs.init("rCVEgB2SShzE8epf1"); // Replace with your public key from EmailJS
})();

// Initialize Firebase Firestore
import { getFirestore, collection, getDocs, setDoc, doc } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';
import { firebaseApp } from './firebase.js';  // Import the initialized Firebase app

const db = getFirestore(firebaseApp); // Get Firestore instance

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
            // Save appointment to Firestore in the 'AP' document
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
    const docRef = doc(db, "appointments", "AP");
    setDoc(docRef, appointmentData)
        .then(() => {
            console.log("Document written with ID: AP");
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}
