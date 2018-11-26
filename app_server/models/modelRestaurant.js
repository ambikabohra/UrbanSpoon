module.exports.fetch_restaurantList = function (req, res) {
    var db = req.db;
    var collection = db.get('restaurants'); //collection name, in which restaurant dataset is stored

    // took only 5 cities
    collection.find({
        Country_Code: 216, City: {
            $in: ["Orlando", "Princeton", "Columbus", "Albany",
                "Athens"]
        }
    },
        { projection: { name: 1, City: 1, Address: 1, Longitude: 1, Latitude: 1, Cuisines: 1, rating: 1, price_range: 1, avg_cost: 1, Votes: 1 } },
        function (err, docs) {
            if (err) throw err;

            restaurantsData = {
                "restaurants": docs
            };
            db.close();
            res.status(200).send(restaurantsData);

        });

    // else{ //for searching documents based on location or city
    //     collection.find({ Country_Code: 216, City: location }, 
    //     { projection: { name: 1, City: 1, Address: 1, Longitude: 1, Latitude: 1, Cuisines: 1, rating: 1, price_range: 1, avg_cost: 1, Votes: 1  } }, 
    //                             function(err, docs)
    //                             {
    //                                 if (err) throw err;
    //                                 restaurantsData = {
    //                                      "restaurants": docs
    //                                 };
    //                                 db.close();
    //                                 res.status(200).send(restaurantsData);
    //                             });
    // }

};


//get method for searching documents based on location or city
// module.exports.get_restaurantlist = function(req, res) 
// {
//     var location= req.body.location;
//     console.log(location);
//     var db = req.db;
//     var collection = db.get('restaurants');

//     console.log("mongodb data");
//     if(location === ""){  //send all, if location or city not specified
//         collection.find({ Country_Code: 216, City: { $in: [ "Orlando", "Princeton", "Columbus",  "Albany",
//         "Athens" ] } }, 
//         { projection: { name: 1, City: 1, Address: 1, Longitude: 1, Latitude: 1, Cuisines: 1, rating: 1, price_range: 1, avg_cost: 1, Votes: 1  } }, 
//                                 function(err, docs)
//                                 {
//                                     if (err) throw err;
//                                     restaurantsData = {
//                                          "restaurants": docs
//                                     };
//                                     db.close();
//                                     res.status(200).send(restaurantsData);

//                                 });
//     }
//     else{
//         console.log("inside else");
//         collection.find({ Country_Code: 216, City: location }, 
//         { projection: { name: 1, City: 1, Address: 1, Longitude: 1, Latitude: 1, Cuisines: 1, rating: 1, price_range: 1, avg_cost: 1, Votes: 1  } }, 
//                                 function(err, docs)
//                                 {
//                                     if (err) throw err;
//                                     restaurantsData = {
//                                          "restaurants": docs
//                                     };
//                                     db.close();
//                                     res.status(200).send(restaurantsData);
//                                 });
//     }

// };