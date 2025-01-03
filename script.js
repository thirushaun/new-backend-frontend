// Initialize EmailJS with your public key
emailjs.init("rCvEgB25ShzE8epf1");  // Replace with your public key

// Set up Firebase configuration (firebase.js should already be included in the HTML)
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
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(firebaseApp); // Firestore Database

// Handle form submission and send email via EmailJS
document.getElementById('appointmentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Validate form data
    if (!name || !email || !phone || !service || !date || !time) {
        alert('Please fill out all the fields.');
        return;
    }

    // Add to Firestore (optional)
    db.collection('appointments').add({
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
