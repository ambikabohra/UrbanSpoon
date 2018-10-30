var url = require('url');

exports.postsignupUser = function postsignupUser(req, res) {
    var emailId = req.body.email;
    var userName = req.body.username;
    var passWord = req.body.password;
    var phone = req.body.phone;
    var db = req.db;
  
    var collection = db.get('user');

    
    collection.insert({"email":emailId,"username" : userName,"password":passWord,
   "phone":phone} ,
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
     
 
}
