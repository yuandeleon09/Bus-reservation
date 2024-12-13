// Key for storing reservation data
const RESERVATION_DATA_KEY = "reservationData";

// Helper: Get Data from Local Storage
function getReservationData() {
    const data = localStorage.getItem(RESERVATION_DATA_KEY);
    return data ? JSON.parse(data) : [];
}

// Helper: Save Data to Local Storage
function saveReservationData(data) {
    localStorage.setItem(RESERVATION_DATA_KEY, JSON.stringify(data));
}

// Handle New Reservation
function addReservation(name, date, origin, destination, time, seatNumber, tripClass, transactionId) {
    const reservation = {
        transactionId,
        name,
        date,
        origin,
        destination,
        time,
        seatNumber,
        tripClass,
        status: "Pending", // Default status
    };
    const data = getReservationData();
    data.push(reservation);
    saveReservationData(data);
}

// Handle Booking Cancellation
function cancelReservation(transactionId) {
    const data = getReservationData();
    const reservation = data.find((item) => item.transactionId === transactionId);

    if (reservation) {
        reservation.status = "Cancelled";
        saveReservationData(data);
        return true; // Cancellation successful
    }
    return false; // No matching transaction ID
}

// Update Reservation Status Based on Date
function updateReservationStatus() {
    const data = getReservationData();
    const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format

    data.forEach((reservation) => {
        if (reservation.status === "Pending" && reservation.date === today) {
            reservation.status = "Success";
        }
    });
    saveReservationData(data);
}

// Display Reservations in Table
function displayReservations(tableId) {
    const data = getReservationData();
    const table = document.getElementById(tableId).getElementsByTagName("tbody")[0];
    table.innerHTML = ""; // Clear existing rows

    data.forEach((reservation) => {
        const row = table.insertRow();
        row.insertCell(0).textContent = reservation.date;
        row.insertCell(1).textContent = `${reservation.origin} → ${reservation.destination}`;
        row.insertCell(2).textContent = reservation.transactionId;
        row.insertCell(3).textContent = reservation.status;
    });
}

// Display Profile Information
function displayProfileDetails() {
    const data = getReservationData();
    const upcomingReservation = data.find((item) => item.status === "Pending");

    if (upcomingReservation) {
        document.getElementById("profileName").textContent = upcomingReservation.name;
        document.getElementById("profileOrigin").textContent = upcomingReservation.origin;
        document.getElementById("profileDestination").textContent = upcomingReservation.destination;
        document.getElementById("profileDate").textContent = upcomingReservation.date;
        document.getElementById("profileTime").textContent = upcomingReservation.time;
        document.getElementById("profileStatus").textContent = upcomingReservation.status;
    } else {
        // Default text if no reservations
        document.getElementById("profileName").textContent = "N/A";
        document.getElementById("profileOrigin").textContent = "N/A";
        document.getElementById("profileDestination").textContent = "N/A";
        document.getElementById("profileDate").textContent = "N/A";
        document.getElementById("profileTime").textContent = "N/A";
        document.getElementById("profileStatus").textContent = "N/A";
    }
}
