document.addEventListener("DOMContentLoaded", () => {
    // Profile Edit Section
    const editBtn = document.getElementById("editBtn");
    const saveChangesBtn = document.getElementById("saveChangesBtn");
    const inputs = document.querySelectorAll(".edit-details input");
    const signOutBtn = document.getElementById("signOutBtn");

    // Edit Button: Enable input fields for editing
    editBtn.addEventListener("click", () => {
        inputs.forEach(input => input.disabled = false);
        editBtn.style.display = "none";
        saveChangesBtn.style.display = "inline-block";
    });

    // Save Changes Button: Save edited data to localStorage
    saveChangesBtn.addEventListener("click", () => {
        const updatedDetails = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
            phoneNumber: document.getElementById("phoneNumber").value,
        };

        // Save updated details to localStorage
        localStorage.setItem("userDetails", JSON.stringify(updatedDetails));
        console.log("Updated Details:", updatedDetails);

        // Disable inputs again
        inputs.forEach(input => input.disabled = true);
        saveChangesBtn.style.display = "none";
        editBtn.style.display = "inline-block";
        alert("Changes saved successfully!");
    });

    // Sign Out Button: Redirect to signup.html
    signOutBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    // Booking History Section
    const bookingHistoryTable = document.getElementById("bookingHistoryTable").querySelector("tbody");
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const updateBookingStatuses = () => {
        const today = new Date().toISOString().split("T")[0];
        bookings.forEach((booking) => {
            if (booking.status === "Pending" && booking.date === today) {
                booking.status = "Success";
            }
        });
        localStorage.setItem("bookings", JSON.stringify(bookings)); // Save updated bookings to localStorage
        displayBookingHistory();
    };

    const displayBookingHistory = () => {
        bookingHistoryTable.innerHTML = ""; // Clear the table before displaying updated data

        bookings.forEach((booking) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${booking.date}</td>
                <td>${booking.origin} to ${booking.destination}</td>
                <td>${booking.transactionId}</td>
                <td>${booking.status}</td>
                <td>
                    <button class="delete-btn" data-id="${booking.transactionId}">Delete</button>
                </td>
            `;
            bookingHistoryTable.appendChild(row);
        });

        // Add event listeners to delete buttons
        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", (e) => {
                const transactionId = e.target.getAttribute("data-id");
                deleteBooking(transactionId);
            });
        });
    };

    const deleteBooking = (transactionId) => {
        // Find the row with the matching transactionId and remove it from the display
        const rowToRemove = document.querySelector(`button[data-id="${transactionId}"]`).closest('tr');
        if (rowToRemove) {
            rowToRemove.remove();
        }

        // Remove the booking from the bookings array and update localStorage
        bookings = bookings.filter(booking => booking.transactionId !== transactionId);
        localStorage.setItem("bookings", JSON.stringify(bookings));
    };

    // Update statuses and display bookings
    updateBookingStatuses();
});
