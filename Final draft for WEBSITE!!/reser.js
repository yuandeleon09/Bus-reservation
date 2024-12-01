const form = document.getElementById('reservationForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get form values
    const reminders = form.elements['reminders'].value;
    const date = form.elements['date'].value;
    const origin = form.elements['origin'].value;
    const destination = form.elements['destination'].value;

    // Basic validation
    if (!reminders || !date || !origin || !destination) {
        alert('Please fill in all fields.');
        return;
    }

    // If validation passes, submit the form or perform other actions
    // ... form submission logic ...
    alert('Form submitted successfully!');
});

function goBack() {
    // Redirect to the dashboard page or previous page
    window.location.href = 'dashboard.html'; // Replace with your dashboard URL
}