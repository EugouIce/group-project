function validateNewStudent() {
    let username = document.getElementById("ns-username").value;
    let password = document.getElementById("ns-password").value;
    let email = document.getElementById("ns-email").value;
    let phone = document.getElementById("ns-phone").value;

    if (username === "" || password === "" || email === "" || phone === "") {
        alert("Please fill out all New Student fields.");
        return false;
    }

    if (phone.length < 10) {
        alert("Please enter a valid mobile number.");
        return false;
    }

    alert("New Student login successful!");
    return true;
}

function validateOnlineStudent() {
    let id = document.getElementById("os-id").value;
    let password = document.getElementById("os-password").value;
    let email = document.getElementById("os-email").value;
    let phone = document.getElementById("os-phone").value;

    if (id === "" || password === "" || email === "" || phone === "") {
        alert("Please fill out all Online Student fields.");
        return false;
    }

    alert("Online Student login successful!");
    return true;
}
