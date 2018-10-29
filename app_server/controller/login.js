
exports.postLogin = function postLogin(req,res){
  var username= req.body.username;
  var password= req.body.password;

  if(username === "uiland@gmail.com" && password === "uiland"){
      console.log("Succesful Login");
      req.session.user = username;
      console.log(req.session.user);
      res.status(200).send({"message":"Success"});

  }else{
      console.log("Failed Login")
      res.status(400).send({"message":"Invalid Credentials"});
  }

}

exports.postLogout = function postLogout(req,res){
    
    req.session.user = null;
    res.status(200).send({"message":"Success"});

}