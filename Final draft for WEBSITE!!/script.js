// Updated buses with seat availability
const buses = [
    { id: 1, name: "Bus A", totalSeats: 40, availableSeats: 40 },
    { id: 2, name: "Bus B", totalSeats: 50, availableSeats: 50 },
    { id: 3, name: "Bus C", totalSeats: 30, availableSeats: 30 }
];

const routes = ["Manila", "Baguio", "Cebu"];

let reservations = [];

// DOM elements
const modal = document.getElementById("modal");
const newBookingBtn = document.getElementById("newBookingBtn");
const closeBtn = document.querySelector(".close");
const reservationTable = document.getElementById("reservationTable");
const totalBookingsEl = document.getElementById("totalBookings");
const availableSeatsEl = document.getElementById("availableSeats");
const totalRevenueEl = document.getElementById("totalRevenue");
const passengerList = document.getElementById("passengerList"); // Passenger list element
const busList = document.getElementById("busList"); // Available buses element
const routeList = document.getElementById("routeList"); // Bus routes element

// Open Modal
newBookingBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

// Close Modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Close modal on outside click
window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

// Add new booking
document.getElementById("bookingForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const passengerName = document.getElementById("passengerName").value;
    const bus = document.getElementById("bus").value;
    const route = document.getElementById("route").value;
    const seats = parseInt(document.getElementById("seats").value); // Number of seats selected

    // Find the bus by its name and check availability
    const selectedBus = buses.find((b) => b.name === bus);
    if (selectedBus.availableSeats < seats) {
        alert("Not enough seats available on this bus.");
        return;
    }

    const booking = {
        id: reservations.length + 1,
        passengerName,
        bus,
        route,
        seats, // Store the number of seats
        status: "Confirmed"
    };

    // Update the bus's available seats
    selectedBus.availableSeats -= seats;

    reservations.push(booking);
    updateReservations();
    updateOverview();
    updatePassengerList();
    updateAvailableBuses();
    updateRoutes();

    modal.style.display = "none"; // Close modal after submission
});

// Update reservation table
function updateReservations() {
    reservationTable.innerHTML = ""; // Clear existing rows
    reservations.forEach((reservation) => {
        const row = `
            <tr>
                <td>${reservation.id}</td>
                <td>${reservation.passengerName}</td>
                <td>${reservation.bus}</td>
                <td>${reservation.route}</td>
                <td>${reservation.seats}</td> <!-- Display number of seats -->
                <td>${reservation.status}</td>
                <td><button class="btn-primary" onclick="cancelBooking(${reservation.id}, '${reservation.bus}', ${reservation.seats})">Cancel</button></td>
            </tr>
        `;
        reservationTable.insertAdjacentHTML("beforeend", row);
    });
}

// Update passenger list
function updatePassengerList() {
    passengerList.innerHTML = ""; // Clear existing list
    reservations.forEach((reservation) => {
        const listItem = `
            <li>${reservation.passengerName} (Bus: ${reservation.bus}, Seats: ${reservation.seats})</li>
        `;
        passengerList.insertAdjacentHTML("beforeend", listItem);
    });
}

// Update available buses
function updateAvailableBuses() {
    busList.innerHTML = ""; // Clear existing bus list
    buses.forEach((bus) => {
        const listItem = `
            <li>${bus.name} - Available Seats: ${bus.availableSeats}/${bus.totalSeats}</li>
        `;
        busList.insertAdjacentHTML("beforeend", listItem);
    });
}

// Update bus routes
function updateRoutes() {
    routeList.innerHTML = ""; // Clear existing route list
    routes.forEach((route) => {
        const listItem = `
            <li>${route}</li>
        `;
        routeList.insertAdjacentHTML("beforeend", listItem);
    });
}

// Update overview (total bookings, available seats, revenue)
function updateOverview() {
    const totalBookings = reservations.length;
    const totalSeats = buses.reduce((total, bus) => total + bus.totalSeats, 0);
    const availableSeats = buses.reduce((total, bus) => total + bus.availableSeats, 0);
    const totalRevenue = reservations.reduce((total, booking) => total + (booking.seats * 10), 0); // Assume $10 per seat

    totalBookingsEl.textContent = totalBookings;
    availableSeatsEl.textContent = availableSeats;
    totalRevenueEl.textContent = `$${totalRevenue}`;
}

// Cancel a booking
function cancelBooking(id, busName, seats) {
    // Find the bus and return the seats
    const selectedBus = buses.find((b) => b.name === busName);
    selectedBus.availableSeats += seats;

    reservations = reservations.filter((reservation) => reservation.id !== id);
    updateReservations();
    updateOverview();
    updatePassengerList();
    updateAvailableBuses();
    updateRoutes();
}
