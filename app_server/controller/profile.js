var url = require('url');

exports.updateProfile = function updateProfile(req, res) {
    var email = req.body.email;
    console.log(email);
    // var username = req.body.username;
    // var phone = req.body.phone;

    if (req.session.user) {
        if (email === "uiland@gmail.com") {
            console.log("Details updated successfully");
           // window.alert("Details updated successfully!");
            res.status(200).send({ "message": "Success" });

        } else {
            console.log("Failed to update details")
            res.status(400).send({ "message": "Failed to update details" });
        }
    }
    else {
        console.log("Nobody is currently logged in!");
        res.status(400).send({ "message": "Nobody is currently logged in!" });
    }
}


exports.deleteProfile = function deleteProfile(req, res) {
    
    var email = req.session.user;
    console.log(req.session);
    if (req.session.user) {
        if (email === "uiland@gmail.com") {
            console.log("Details deleted successfully");
            //window.alert("Details deleted successfully!");
            res.status(200).send({ "message": "Success" });
            req.session.user = null;

        } else {
            console.log("Failed to delete details")
            res.status(400).send({ "message": "Failed to delete details" });
        }
    }
    else {
        console.log("Nobody is currently logged in!");
        res.status(400).send({ "message": "Nobody is currently logged in!" });
    }
}

exports.getUserDetails = function getUserDetails(req, res){
    console.log("Inside profile api");
    if(req.session.user){
    res.status(200).send({
        "message": "Success",
        "username":"lavanya",
        "email":"uiland@gmail.com",
        "phone":"(999) 999-9999"
    });
}
else{
    console.log("Nobody is currently logged in!");
        res.status(400).send({ "message": "Nobody is currently logged in!" });
}
}


