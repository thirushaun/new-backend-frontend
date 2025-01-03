import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js';
import { db } from './firebase.js';  // Ensure that firebase.js is set up properly

// Initialize EmailJS with your public key
emailjs.init("rCvEgB25ShzE8epf1");

// Handle form submission and send email via EmailJS
document.getElementById('appointmentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (!name || !email || !phone || !service || !date || !time) {
        alert('Please fill out all the fields.');
        return;
    }

    // Save to Firestore
    addDoc(collection(db, "appointments"), {
        name: name,
        email: email,
        phone: phone,
        service: service,
        date: date,
        time: time,
    })
    .then(() => {
        // Send email using EmailJS
        const emailParams = {
            name: name,
            email: email,
            phone: phone,
            service: service,
            date: date,
            time: time
        };

        emailjs.send("service_mmd3jws", "template_lraqztk", emailParams)
            .then((response) => {
                alert("Your appointment has been booked!");
                document.getElementById('appointmentForm').reset();
            })
            .catch((error) => {
                console.error('Error sending email:', error);
                alert("Something went wrong. Please try again.");
            });
    })
    .catch((error) => {
        console.error('Error saving data to Firestore:', error);
        alert("Something went wrong. Please try again.");
    });
});
