// Assuming Firebase has been initialized via the above script
document.getElementById('appointmentForm').addEventListener('submit', async function (event) {
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

    // Save to Firestore
    try {
        const docRef = await db.collection("appointments").add({
            name: name,
            email: email,
            phone: phone,
            service: service,
            date: date,
            time: time
        });
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
