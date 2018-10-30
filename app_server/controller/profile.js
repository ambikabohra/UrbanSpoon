var url = require('url');

exports.updateProfile = function updateProfile(req, res) {
    var emailId = req.body.email;
    var userName = req.body.username;
    var phone = req.body.phone;
    var db = req.db;
    //console.log(email);
    // Set our collection.
    var collection = db.get('user');

    // Submit to the database.
    collection.update({"email":emailId},{$set:{"username" : userName,
   "phone":phone} },
                       function (err, doc) 
                       {
                           if (err) {
                               res.send("Insert failed.");
                           }
                           else {
                               // Forward to success page
                               res.status(200).send({ "message": "Success" });
                           }
                       });
    // if (req.session.user) {
    //     if (email === "uiland@gmail.com") {
    //         console.log("Details updated successfully");
    //        // window.alert("Details updated successfully!");
    //        

    //     } else {
    //         console.log("Failed to update details")
    //         res.status(400).send({ "message": "Failed to update details" });
    //     }
    // }
    // else {
    //     console.log("Nobody is currently logged in!");
    //     res.status(400).send({ "message": "Nobody is currently logged in!" });
    // }
}


exports.deleteProfile = function deleteProfile(req, res) {
    
    var email = req.session.user;
    console.log(req.session);
    if (req.session.user) {

    var db = req.db;
    var collection = db.get('user');

    // Submit to the database.
    collection.remove( { "email" : email },
                       function (err, doc) 
                       {
                           if (err) {
                            res.status(400).send({ "message": "Failed to delete details" });
                               res.send("Delete failed.");
                           }
                           else {
                            console.log("Details deleted successfully");
                            res.status(200).send({ "message": "Success" });
                            req.session.user = null;
                           }
                       });
    }
    else {
        console.log("Nobody is currently logged in!");
        res.status(400).send({ "message": "Nobody is currently logged in!" });
    }
}

exports.getUserDetails = function getUserDetails(req, res){
    console.log("Inside profile api");
   // if(req.session.user){
    var emailId = req.session.user;
    console.log("heyyyy"+req.session.user);
    var db = req.db;
    var collection = db.get('user');
    
    collection.find( { email : emailId }, 
                     function(err, doc) 
                     {
                         if (err) {
                             res.send("Find failed.");
                         }
                         else {
                            res.send({
                                "message": "Success",
                                "username":doc[0].username,
                                "email":doc[0].email,
                                "phone":doc[0].phone
                            })
                            //  res.render('showuser', 
                            //             { title: 'Show User: ' + uname,
                            //               mail: doc[0].email })
                         }
                     });

    

    
// }
// else{
//     console.log("Nobody is currently logged in!");
//         res.status(400).send({ "message": "Nobody is currently logged in!" });
// }
}


