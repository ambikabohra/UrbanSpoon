var expression=/\s+/g;

function validateUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    emailRE = /^.+@.+\..{2,4}$/;
    if (username!="" && !username.match(emailRE)){
        window.alert("Invalid email address. " + "Should be xxxxx@xxxxx.xxx\n");
        return false;
    } 


    if (expression.test(password) || expression.test(username)) {
        alert("Whitespaces are not allowed!");
    }

    if (username == "uiland@gmail.com" && password == "uiland") {
        alert("Login successful");
        window.location = "restaurants";
        return false;
    }

    if (username == "") {
        window.alert("Please enter your email id");
        username.focus();
        return false;
    }

    if (password == "") {
        window.alert("Please enter your password");
        password.focus();
        return false;
    }

    else {
        window.alert("Wrong Credentials");
    }
    return false;
}