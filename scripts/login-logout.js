function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "student" && pass === "1234") {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("portal").classList.remove("hidden");
    } else {
        alert("Invalid login!");
    }
}

// Add Enter key support with validation
function setupEnterKeyLogin() {
    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");
    
    function handleEnterKey(event) {
        if (event.key === 'Enter') {
            // Check if both fields have values before attempting login
            if (usernameField.value.trim() && passwordField.value.trim()) {
                login();
            }
        }
    }
    
    if (usernameField) {
        usernameField.addEventListener('keypress', handleEnterKey);
    }
    
    if (passwordField) {
        passwordField.addEventListener('keypress', handleEnterKey);
    }
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupEnterKeyLogin);
} else {
    setupEnterKeyLogin();
}

function logout(elem) {
    highlightMenu(elem);
    location.reload();
}