document.addEventListener("DOMContentLoaded", () => {
    const transactionsTable = document.getElementById("transactionsTable").querySelector("tbody");
    const paymentModal = document.getElementById("paymentModal");
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Base price for economy class
    const basePrice = 500;

    // Function to calculate total price
    const calculatePrice = (seatCount, tripClass) => {
        let pricePerSeat = basePrice;
        if (tripClass === "business") {
            pricePerSeat *= 2; // Double price for business class
        }
        return pricePerSeat * seatCount;
    };

    const openPaymentModal = (transactionId) => {
        paymentModal.style.display = "block";
        paymentModal.setAttribute("data-transaction-id", transactionId);
    };

    const closePaymentModal = () => {
        paymentModal.style.display = "none";
        paymentModal.removeAttribute("data-transaction-id");
    };

    const completePayment = (method) => {
        const transactionId = paymentModal.getAttribute("data-transaction-id");
        const booking = bookings.find((b) => b.transactionId === transactionId);

        if (booking && booking.status === "Pending") {
            booking.status = "Paid";
            booking.paymentMethod = method;
            localStorage.setItem("bookings", JSON.stringify(bookings));
            alert(`Payment completed via ${method}.`);
            closePaymentModal();
            displayTransactions();
        }
    };

    const displayTransactions = () => {
        transactionsTable.innerHTML = "";
        bookings.forEach((booking) => {
            const totalPrice = calculatePrice(booking.seatNumber, booking.tripClass); // Calculate total price

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${booking.date}</td>
                <td>${booking.origin} to ${booking.destination}</td>
                <td>${booking.transactionId}</td>
                <td>PHP ${totalPrice.toLocaleString()}</td> <!-- Display formatted price -->
                <td>${booking.status}</td>
                <td>
                    ${booking.status === "Pending" ? `<button class="pay-btn" data-id="${booking.transactionId}">Pay Now</button>` : ""}
                </td>
            `;
            transactionsTable.appendChild(row);
        });

        document.querySelectorAll(".pay-btn").forEach((button) => {
            button.addEventListener("click", (e) => {
                const transactionId = e.target.getAttribute("data-id");
                openPaymentModal(transactionId);
            });
        });
    };

    // Close modal when user clicks "Cancel"
    document.getElementById("closeModal").addEventListener("click", closePaymentModal);

    // Payment button handlers
    document.getElementById("payGcash").addEventListener("click", () => completePayment("GCash"));
    document.getElementById("payCard").addEventListener("click", () => completePayment("Card"));

    // Initial display of transactions
    displayTransactions();
});
