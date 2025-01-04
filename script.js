document.getElementById('appointmentForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (!name || !email || !phone || !service || !date || !time) {
        alert("Please fill out all fields.");
        return;
    }

    // Send email to patient and doctor
    const emailParams = {
        to_name: name,
        to_email: email,
        service: service,
        date: date,
        time: time
    };

    try {
        // Send email to patient
        await emailjs.send('service_mmd3jws', 'template_lraqztk', emailParams);
        console.log('Email sent to patient successfully');

        // Save appointment to Firestore
        const docRef = await firebase.firestore().collection('appointments').add({
            name,
            email,
            phone,
            service,
            date,
            time,
            status: "Pending" // Default status
        });
        console.log("Appointment booked with ID: ", docRef.id);

        alert("Appointment booked successfully! Emails have been sent.");
        document.getElementById('appointmentForm').reset(); // Clear the form
    } catch (error) {
        console.error("Error: ", error);
        alert("An error occurred. Please try again.");
    }
});
