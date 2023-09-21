const loginButton = document.getElementById("loginButton");

const correctUsername = "user";
const correctPassword = "password";

// Add a click event listener to the login button
loginButton.addEventListener("click", function() {
    // Redirect to the new HTML page (dashboard.html)
    event.preventDefault(); // Prevent the default form submission.

    // Get the entered username and password.
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if the entered credentials are correct.
    if (username === correctUsername && password === correctPassword) {
        // If correct, navigate to the "hello.html" page.
        window.location.href = "resume.html";
    } else {
        // If incorrect, display an error message (you can customize this part).
        alert("Invalid username or password. Please try again.");
    }
});

