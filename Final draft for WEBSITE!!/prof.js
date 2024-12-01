// Assuming you have a way to fetch user data and booking history from a server
const userData = {
    firstName: "John",
    lastName: "Doe",
    // ... other user details
    bookingHistory: [
        { date: "2024-11-20", route: "City A to City B", reference: "TX12345" },
        { date: "2024-11-20", route: "City B to City A", reference: "TX12345" }
    ]
};

// Populate user details
document.getElementById("firstName").value = userData.firstName;
// ... (populate other fields)

// Populate booking history table
const bookingHistoryTable = document.getElementById("bookingHistoryTable");
userData.bookingHistory.forEach(booking => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${booking.date}</td>
        <td>${booking.route}</td>
        <td>${booking.reference}</td>
    `;
    bookingHistoryTable.appendChild(row);
});

// Handle sign out button click
document.getElementById("signOutBtn").addEventListener("click", () => {
    // Implement sign out logic here, e.g., redirect to login page, clear session, etc.
});