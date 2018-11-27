var express = require('express');
var router = express.Router();
var ctrlMain = require("../controller/main");
var ctrlLogin = require("../controller/login");
var ctrlUser = require("../controller/profile");
var ctrlRest = require("../controller/restaurants");
var ctrlSignUp = require("../controller/signupUser");

var modelRestaurant = require("../models/modelRestaurant");
var modelSearchbyName = require("../models/modelSearchbyName");
//var modelProfile = require("../models/profile")

//router.post('/search-restaurants', modelRestaurant.fetch_restaurantList); //display and search
router.post('/getRestaurants', modelRestaurant.fetch_restaurantList); //index
router.get('/showRestaurantbyName/:restaurantname', modelSearchbyName.fetch_restaurantbyName); //show

router.get('/', ctrlMain.home);
router.get('/login', ctrlMain.login);
router.get('/restaurants', ctrlMain.restaurants); 
router.get('/dashboard', ctrlMain.dashboard); 
router.get('/profile', ctrlMain.profile);
router.get('/signup', ctrlMain.signup); //new
router.post('/loginValidate', ctrlLogin.postLogin);
router.post('/signupUser',ctrlSignUp.postsignupUser);//create
// router.post('/search-restaurants', ctrlRest.fetchRestaurants);
router.post('/login', ctrlLogin.postLogin);
router.post('/logout', ctrlLogin.postLogout);
router.get('/getDetails/:email', ctrlUser.getUserDetails); //edit
router.put('/update-profile/:email', ctrlUser.updateProfile); //PUT
router.delete('/delete-profile/:email', ctrlUser.deleteProfile); //DELETE

module.exports = router; 