var express = require('express');
var router = express.Router();
var ctrlMain = require("../controller/main");
var ctrlLogin = require("../controller/login");
var ctrlUser = require("../controller/profile");
var ctrlRest = require("../controller/restaurants");

var modelRestaurant = require("../models/modelRestaurant");
//var modelProfile = require("../models/profile")

router.post('/search-restaurants', modelRestaurant.fetch_restaurantList); //display and search

router.get('/', ctrlMain.home);
router.get('/login', ctrlMain.login);
router.get('/restaurants', ctrlMain.restaurants);
router.get('/profile', ctrlMain.profile);

// router.post('/search-restaurants', ctrlRest.fetchRestaurants);
router.post('/login', ctrlLogin.postLogin);
router.post('/logout', ctrlLogin.postLogout);
router.get('/getDetails', ctrlUser.getUserDetails);
router.post('/update-profile', ctrlUser.updateProfile);
router.post('/delete-profile', ctrlUser.deleteProfile);


module.exports = router; 