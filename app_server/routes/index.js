
    var express = require('express');
    var router = express.Router();
    var ctrlMain = require("../controller/main");
    var ctrlLogin = require("../controller/login");
    var ctrlRest = require("../controller/restaurants");
    var ctrlSignUp = require("../controller/signupUser");

    var modelRestaurant = require("../models/modelRestaurant");
    router.post('/search-restaurants', modelRestaurant.fetch_restaurantList); //display and search
    
    router.get('/', ctrlMain.home);
    router.get('/login', ctrlMain.login);
    router.get('/signup', ctrlMain.signup);
    router.get('/restaurants', ctrlMain.restaurants);
    router.post('/loginValidate', ctrlLogin.postLogin);
    // router.post('/search-restaurants', ctrlRest.fetchRestaurants);
    
    router.post('/logout', ctrlLogin.postLogout);
    router.post('/signupUser',ctrlSignUp.postsignupUser);

module.exports = router; 