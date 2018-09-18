var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
    console.log("hello");
var email = document.getElementById("email").value;
var password = document.getElementById("password").value;
const data = {
    "username": email,
    "password": password
};
fetch("/login", {
    method : "POST",
    body: JSON.stringify(data),
    headers:{
        'Content-Type': 'application/json'
    }
})
.then(r => r.json())
.then(response => {
    if (response.message === "Success") {
        window.location = "/restaurants";

    }
    else {
        window.alert(response.message);
        console.log("failed......");
        attempt --;// Decrementing by one.
        // alert("You have left "+attempt+" attempt;");
        if( attempt == 0){
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;
        }
    }
    console.log('Success:', JSON.stringify(response));
}).catch(error => {
    console.error('Error:', error)
});
return false;
}



