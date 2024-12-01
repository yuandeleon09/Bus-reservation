<?php
// Start session
session_start();

// Destroy the session
session_destroy();

// Redirect to signup.html
header("Location: signup.html");
exit();
?>
