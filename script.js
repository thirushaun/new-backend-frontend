// Ensure emailJS is initialized correctly
(function() {
    emailjs.init("rCVEgB2SShzE8epf1"); // Your public key from EmailJS
})();

document.getElementById('appointmentForm').addEventListener('submit', async function (event) {
    event.preventDefault();

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
    .then(async (response) => {
        console.log('Email sent successfully', response);
        alert('Appointment booked and email sent successfully!');

        // Save appointment data to Firebase Firestore
        const appointmentData = { name, email, phone, service, date, time };
        await saveAppointmentToFirestore(appointmentData); // Call the function to save data
    })
    .catch((error) => {
        console.error('Error occurred:', error);
        alert('An error occurred while sending the email: ' + error.text);
    });
});

// Function to save appointment data to Firestore
async function saveAppointmentToFirestore(appointmentData) {
    try {
        // Specify the document ID (AP)
        const docRef = await firebase.firestore().collection("appointments").doc("AP").set(appointmentData);
        console.log("Appointment data added to Firestore:", docRef);
    } catch (error) {
        console.error("Error saving appointment to Firestore:", error);
        alert("An error occurred while saving the appointment data.");
    }
}
