// Function to go back to the dashboard
function goBack() {
    window.location.href = "dashboard.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const reservationForm = document.getElementById("reservationForm");
    const seatNumberInput = document.getElementById("seatNumber");
    const basePrice = 500; // Base price per seat in economy class

    // Function to calculate total price
    const calculatePrice = (seatCount, tripClass) => {
        let pricePerSeat = basePrice;
        if (tripClass === "business") {
            pricePerSeat *= 2; // Double price for business class
        }
        return pricePerSeat * seatCount;
    };

    // Generate random transaction ID
    const generateTransactionId = () => {
        return Math.floor(10000000000 + Math.random() * 90000000000).toString();
    };

    reservationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Fetch form values
        const name = document.getElementById("name").value;
        const date = document.getElementById("date").value;
        const origin = document.getElementById("origin").value;
        const destination = document.getElementById("destination").value;
        const time = document.getElementById("time").value;
        const seatNumber = parseInt(seatNumberInput.value, 10);
        const tripClass = document.querySelector('input[name="tripClass"]:checked').value;

        // Calculate total price
        const totalPrice = calculatePrice(seatNumber, tripClass);

        // Create transaction ID
        const transactionId = generateTransactionId();

        // Save booking data to localStorage
        const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        bookings.push({
            name,
            date,
            origin,
            destination,
            time,
            seatNumber,
            tripClass,
            transactionId,
            totalPrice, // Save totalPrice for use in acc.html
            status: "Pending",
        });
        localStorage.setItem("bookings", JSON.stringify(bookings));

        // Display receipt
        const receiptModal = document.getElementById("receiptModal");
        document.getElementById("transactionId").textContent = transactionId;
        document.getElementById("customerName").textContent = name;
        document.getElementById("originPoint").textContent = origin;
        document.getElementById("destinationPoint").textContent = destination;
        document.getElementById("travelDate").textContent = date;
        document.getElementById("travelTime").textContent = time;
        document.getElementById("tripClass").textContent = tripClass;
        document.getElementById("totalPrice").textContent = totalPrice.toLocaleString(); // Format price

        receiptModal.style.display = "block";
    });

    // Close receipt modal
    window.closeModal1 = () => {
        const receiptModal = document.getElementById("receiptModal");
        receiptModal.style.display = "none";
    };
    window.closeModal2 = () => {
        const receiptModal = document.getElementById("receiptModal");
        receiptModal.style.display = "none";
        window.location.href = "acc.html"; // Redirect to acc.html
    };
});

