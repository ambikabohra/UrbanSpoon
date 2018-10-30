var expression=/\s+/g;

function getDetails() {

    fetch("/getDetails", {
        method: "GET",
    })
    .then(r => r.json())
    .then(response => {
        if (response.message === "Success") {
            const usernameField = document.getElementById('username');
            const emailField = document.getElementById('email');
            const phoneField = document.getElementById('phone')
            usernameField.value = response.username;
            emailField.value = response.email;
            phoneField.value = response.phone;
            //window.location = "/";      
        }
        else {
            window.alert("Unable to get User details!");
        }
        console.log('Success:', JSON.stringify(response));
    }).catch(error => {
        console.error('Error:', error)
    });
}

function updateAccount() {

    var email = document.getElementById("email").value;
    console.log(email);
    var username = document.getElementById("username").value;
    var phone = document.getElementById("phone").value;

    emailRE = /^.+@.+\..{2,4}$/;
    if (email!="" && !email.match(emailRE)){
        window.alert("Invalid email address. " + "Should be xxxxx@xxxxx.xxx\n");
        return false;
    } 

    phoneRE = /^\(\d{3}\) *\d{3}-\d{4}$/;
    if (phone!="" && !phone.match(phoneRE)){
        window.alert("Invalid phone number. " + "Should be (xxx) xxx-xxxx\n");
        return false;
    } 

    if (expression.test(email) || expression.test(username)) {
        alert("Whitespaces are not allowed!");
    }

    if (username == "") {
        window.alert("Please enter your new username");
        username.focus();
        return false;
    }

    if (email == "") {
        window.alert("Please enter your new email id");
        password.focus();
        return false;
    }

    // if (phone == "") {
    //     window.alert("Please enter your new phone number");
    //     password.focus();
    //     return false;
    // }
    
    const data = {
        "email": email,
        "username": username,
        "phone": phone
    };

    fetch("/update-profile", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(r => r.json())
    .then(response => {
        console.log(response.message);
        if (response.message === "Success") {
            
            window.alert("Updated successfully!");
            //window.location = "profile";
        }
        else {
            window.alert("Unable to Update Profile!");
        }
        console.log('Success:', JSON.stringify(response));
    }).catch(error => {
        console.error('Error:', error)
    });
}

function deleteAccount() {

    // const data = {
    //     "username": req.session.user
    // };
    var act = confirm("Are you sure you want to delete your account?");

    if(act){
        fetch("/delete-profile", {
            method: "POST",
            // body: JSON.stringify(data),
            // headers: {
            //     'Content-Type': 'application/json'
            // }
        })
        .then(r => r.json())
        .then(response => {
            if (response.message === "Success") {
                window.alert("Deleted successfully!");
                
                window.location = "/";

            }
            else {
                window.alert("Unable to Delete Profile!");
            }
            console.log('Success:', JSON.stringify(response));
        }).catch(error => {
            console.error('Error:', error)
        });
    }
    return false;
}


// function verifyDetails(event){
//     // event.stopPropagation();
//     // if (event.target.classList.contains('update')) {
//     //     updateAccount();
//     // } else if (event.target.classList.contains('delete')) {
//     //     deleteAccount();
//     // }
//     return false;
// }