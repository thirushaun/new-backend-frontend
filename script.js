// Import the Firebase SDK (ensure this is in your script.js file)
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfagQ1fcsslhZ33xm1QBqGOYO_JsqEkeg",
  authDomain: "medivironap.firebaseapp.com",
  projectId: "medivironap",
  storageBucket: "medivironap.firebasestorage.app",
  messagingSenderId: "440212618885",
  appId: "1:440212618885:web:11e85acba754ea9fd273ec",
  measurementId: "G-0ZTM2WNX7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Ensure emailJS is initialized correctly
(function() {
    emailjs.init("rCVEgB2SShzE8epf1"); // Replace with your public key
})();

// Appointment form submission
document.getElementById('appointmentForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting the default way

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
        console.error('Error occurred while sending email:', error);
        alert('An error occurred while sending the email: ' + error.text);
    });
});

// Save Appointment Function to Firestore
async function saveAppointmentToFirestore(appointmentData) {
  try {
    const docRef = await addDoc(collection(db, "appointments"), appointmentData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error saving appointment to Firestore: ", e);
    alert('An error occurred while saving the appointment data: ' + e);
  }
}

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
