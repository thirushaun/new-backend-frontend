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
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

document.getElementById('appointmentForm').addEventListener('submit', async function(event) {
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

    // Save to Firestore
    try {
        const docRef = await db.collection("appointments").add(appointmentData);
        console.log("Document written with ID: ", docRef.id);

        // Send email via EmailJS
        emailjs.send('service_mmd3jws', 'template_lraqztk', {
            to_name: name,
            to_email: email,
            service: service,
            date: date,
            time: time
        }).then(response => {
            console.log('Email sent successfully', response);
            alert('Appointment booked and email sent successfully!');
        }).catch(error => {
            console.error('Error occurred while sending the email:', error);
            alert('An error occurred while sending the email: ' + error.text);
        });

    } catch (e) {
        console.error("Error adding document: ", e);
        alert("There was an error while saving the appointment data.");
    }
});
