

// Select the logout button
const logoutBtn = document.getElementById("logoutBtn");

// Add event listener for the logout button
logoutBtn.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default link behavior

    // Clear any session data (if stored)
    // localStorage.removeItem("loggedInUser"); // Uncomment if using localStorage for sessions

    // Redirect to the login page
    window.location.href = "login.html";
});
