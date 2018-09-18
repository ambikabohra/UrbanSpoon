var express = require('express');
var router = express.Router();
var ctrlMain = require("../controller/main");
var ctrlLogin = require("../controller/login");
var ctrlRest = require("../controller/restaurants");

router.get('/', ctrlMain.home);
router.get('/login', ctrlMain.login);
router.get('/restaurants', ctrlMain.restaurants);

router.post('/search-restaurants', ctrlRest.fetchRestaurants);
router.post('/login', ctrlLogin.postLogin);
router.post('/logout', ctrlLogin.postLogout);


module.exports = router;