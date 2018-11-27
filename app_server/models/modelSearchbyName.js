module.exports.fetch_restaurantbyName = function (req, res) {
    //var location= (req.body.location).trim();
    //console.log("inside fetch_restaurantbyName");
    var restaurantname = req.params.restaurantname;
    //console.log(req.params);
    var db = req.db;
    var collection = db.get('restaurants'); //collection name, in which restaurant dataset is stored
    //for searching documents based on location or city

    collection.find({ City: restaurantname },
        { projection: { name: 1, City: 1, Address: 1, Longitude: 1, Latitude: 1, Cuisines: 1, rating: 1, Votes: 1 } },
        function (err, docs) {
            if (err) throw err;
            restaurantsData = {
                "restaurants": docs
            };
            db.close();
            res.status(200).send(restaurantsData);
        }); 
    


    // collection.find({ Name: restaurantname },
    //     { projection: { name: 1, City: 1, Address: 1, Longitude: 1, Latitude: 1, Cuisines: 1, rating: 1, Votes: 1 } },
    //     function (err, docs) {
    //         if (err) throw err;
    //         restaurantsData = {
    //             "restaurants": docs
    //         };
    //         if(!restaurantsData){
    //             collection.find({ City: restaurantname },
    //                 { projection: { name: 1, City: 1, Address: 1, Longitude: 1, Latitude: 1, Cuisines: 1, rating: 1, Votes: 1 } },
    //                 function (err, docs) {
    //                     if (err) throw err;
    //                     restaurantsData = {
    //                         "restaurants": docs
    //                     };
    //                 });
    //         }
    //         db.close();
    //         res.status(200).send(restaurantsData);
    //     });
    


        // Working code of zomato dataset

        // collection.find({ Country_Code: 216, Name: restaurantname },
        //     { projection: { name: 1, City: 1, Address: 1, Longitude: 1, Latitude: 1, Cuisines: 1, rating: 1, price_range: 1, avg_cost: 1, Votes: 1 } },
        //     function (err, docs) {
        //         if (err) throw err;
        //         restaurantsData = {
        //             "restaurants": docs
        //         };
        //         db.close();
        //         res.status(200).send(restaurantsData);
        //     });

        // End of Working code of zomato dataset


};