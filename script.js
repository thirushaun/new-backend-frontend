// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// EmailJS initialization
(function () {
    emailjs.init("rCVEgB2SShzE8epf1"); // Replace with your public key from EmailJS
})();

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

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Get Firestore instance

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
