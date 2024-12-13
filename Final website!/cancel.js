document.addEventListener("DOMContentLoaded", () => {
    const cancelForm = document.getElementById("cancelForm");

    cancelForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const transactionId = document.getElementById("transactionId").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const reason = document.getElementById("reason").value;

        // Get bookings from localStorage
        const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

        // Find the booking by transactionId
        const booking = bookings.find(b => b.transactionId === transactionId);

        if (booking) {
            if (booking.status !== "Success") { // Check if status is not already "Success"
                booking.status = "Cancelled"; // Update status to "Cancelled"
                localStorage.setItem("bookings", JSON.stringify(bookings)); // Save to localStorage
                alert("Your booking has been cancelled.");
                window.location.href = "acc.html"; // Redirect to the account page
            } else {
                alert("You cannot cancel a completed booking.");
            }
        } else {
            alert("Transaction ID not found.");
        }
    });
});
