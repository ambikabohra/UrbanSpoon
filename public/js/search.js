
        var map;
        var restaurantResponse = null;
        var markers = [];
        var seen = false;

        function onLoadHandler() {
                clearMarkers()
                const list = document.getElementById("restaurant-list");
                const location = document.getElementById("location").value;
                console.log("given locations is " +location);
                const data = {
                    location: location
                };
                
                if(seen == false) { //if page loads first time
                    
                fetch("/search-restaurants", {
                    method : "POST",
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
                .then(r => r.json())
                .then(response => {
                    if (Array.isArray(response.restaurants)) {
                        console.log('Success:', JSON.stringify(response));
                        restaurantResponse = response.restaurants; //save the json response as a local variable
                        console.log(restaurantResponse[0]);
                        appendRestaurants(list, response.restaurants, location);
                        seen = true;
                    }
                    else if(response.message === "Please enter valid location!"){
                            while (list.firstChild) {
                            list.removeChild(list.firstChild);
                        }
                    }
                }).catch(error => {
                    console.error('Error:', error)
                });
             }  
            //if data is saved already
            else if(  location.toLowerCase() == "san jose" || location.toLowerCase() == "fremont" || location.toLowerCase() == ""){
                appendRestaurants(list, restaurantResponse, location.toLowerCase());
            }
            else{
                //alert("Invalid entry!!");
                openDialog();
            }
        }

        function appendRestaurants(node, array, location) {
            const rating = parseFloat(document.getElementById("selectRating").value);
            const cuisine = (document.getElementById("selectCuisine").value);
                while (node.firstChild) {
                    node.removeChild(node.firstChild);
                }
                let nodeTemplate = "";
                
                array.forEach(item => {
                    var address = item.address.toLowerCase();
                    
                    if( (address.includes(location) || location == "")
                    && ( (item.rating >= rating && item.rating < rating+1 )|| rating == 0)
                    && (item.cuisine == cuisine || cuisine == "0")
                
                ) { //if location is matched 
                   
                        addMarker(item.location, item.name)
                        nodeTemplate = nodeTemplate + `<div class="restaurant">
                        <div class="img-container">
                            <img src=${item.image}></img>
                        </div>

                        <div class="data-container">
                            <div>${item.name}</div>
                            <div>${item.address}</div>
                            <div>${item.rating}</div>
                            <div>${item.cuisine}</div>
                        </div>
                        </div>`;
                    }
                });
                node.insertAdjacentHTML('beforeend', nodeTemplate);
            }

            function goHome() {

            fetch("/logout", {
                method : "POST",
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            .then(r => r.json())
            .then(response => {
                if (response.message === "Success") {
                    window.location = "/";

                }
                else {
                    window.alert("Unable to Logout!");
                }
                console.log('Success:', JSON.stringify(response));
            }).catch(error => {
                console.error('Error:', error)
            });
        }

        //intiate map
        function initMap() {
            
          map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: new google.maps.LatLng(37.335480,-121.893028),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
          });
          
          // Create a <script> tag and set the USGS URL as the source.
          var script = document.createElement('script');
     
          script.src = onLoadHandler();
          document.getElementsByTagName('head')[0].appendChild(script);
        }

        // Adds a marker to the map and push to the array.
        function addMarker(location, restaurantName){
            var rs = location.split(",");
            console.log(parseFloat(rs[0]));
            var myLatLng = {lat: parseFloat(rs[0]), lng: parseFloat(rs[1])};
            
            var marker = new google.maps.Marker({
            position: myLatLng,
            // animation:google.maps.Animation.BOUNCE,
            map: map
            });
            markers.push(marker);

              //restaurants name on pop-up info window
            var infowindow = new google.maps.InfoWindow({
                content: restaurantName
           
            });
            infowindow.open(map,marker);
        }

      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }

      // Shows any markers currently in the array.
      function showMarkers() {
        setMapOnAll(map);
      }

      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
      }

    
        // Loop through the results array and place a marker for each
        // set of coordinates.
        window.eqfeed_callback = function(results) {
          for (var i = 0; i < results.features.length; i++) {
            var coords = results.features[i].geometry.coordinates;
            var latLng = new google.maps.LatLng(coords[1],coords[0]);
            var marker = new google.maps.Marker({
              position: latLng,
              map: map
            });
          }
        }
    
