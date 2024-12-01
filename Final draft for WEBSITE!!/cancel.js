const form = document.getElementById('cancellationForm');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const bookingReference = form.elements['bookingReference'].value;
    const email = form.elements['email'].value;
    const phoneNumber = form.elements['phoneNumber'].value;
    const reason = form.elements['reason'].value;

    // Basic validation (you can add more complex validation as needed)
    if (!bookingReference || !email || !phoneNumber || !reason) {
        alert('Please fill in all fields.');
        return;
    }

    // Send form data to server (e.g., using AJAX or fetch API)
    // ... (your server-side logic here)

    // Display success message or redirect to another page
    alert('Form submitted successfully!');
    // window.location.href = 'success.html'; // Redirect to success page
});