// Ensure emailJS is initialized correctly
(function() {
    emailjs.init("rCVEgB2SShzE8epf1"); // Replace with your public key
})();

// Appointment form submission
document.getElementById('appointmentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Validate input
    if (!name || !email || !phone || !service || !date || !time) {
        alert("Please fill out all the fields.");
        return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const appointmentData = {
        name: name,
        email: email,
        phone: phone,
        service: service,
        date: date,
        time: time
    };

    console.log('Sending appointment data:', appointmentData);

    // Send email via EmailJS
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

// Admin login functionality
document.getElementById('adminLogin').addEventListener('click', function() {
    document.getElementById('adminLoginSection').style.display = 'block';
});

document.getElementById('adminLoginBtn').addEventListener('click', function() {
    const enteredPassword = document.getElementById('adminPasswordInput').value;
    const correctPassword = '20061968'; // Set the admin password

    if (enteredPassword === correctPassword) {
        window.location.href = 'admin_dashboard.html'; // Redirect to admin dashboard if correct
    } else {
        alert('Incorrect password!');
    }
});

// Save Appointment Function
import { db } from './firebase'; // Ensure db is imported correctly
import { collection, doc, setDoc } from 'firebase/firestore';

// Function to save appointment data to Firestore
async function saveAppointmentToFirestore(appointmentData) {
    try {
        const docRef = doc(db, "appointments", "AP"); // Define the document ID as 'AP'

        // Save the data to Firestore in the 'AP' document
        await setDoc(docRef, appointmentData); // Set the data in the 'AP' document
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
