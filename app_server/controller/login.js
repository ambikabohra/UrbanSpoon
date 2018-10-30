
exports.postLogin = function postLogin(req,res){
  var username= req.body.username;
  var password= req.body.password;
  console.log("entered" + username);
  console.log("entered" + password);
  var db = req.db;
  var collection = db.get('user');

  collection.find( { "email" : username }, 
    function(err, doc) 
    {
        if (err) {
            res.status(400).send({"message":"Invalid username"});
        }
        else {
            console.log("entered" + password);
            console.log("database "+doc[0].password);
           if(password === doc[0].password){
            console.log("Succesful Login");
            req.session.user = username;
            console.log(req.session.user);
            res.status(200).send({"message":"Success"});
           }else{
            console.log("Failed Login")
            res.status(400).send({"message":"Invalid"});
           }
        }
    });

}

exports.postLogout = function postLogout(req,res){
    
    req.session.user = null;
    res.status(200).send({"message":"Success"});

}