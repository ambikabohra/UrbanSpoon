
        var map;
        var markers = [];

        function onLoadHandler() {
                clearMarkers();
                const list = document.getElementById("restaurant-list");
                const location = document.getElementById("location").value;
                console.log("given locations is " +location);
                const data = {
                    location: location
                };
                    
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

        function appendRestaurants(node, array, location) {
            const rating = parseFloat(document.getElementById("selectRating").value);
            const cuisine = (document.getElementById("selectCuisine").value).toLowerCase();
            console.log("array is");
             console.log(array[0]);
                while (node.firstChild) {
                    node.removeChild(node.firstChild);
                }
                let nodeTemplate = "";
                
                array.forEach(item => {
                    var address = item.Address.toLowerCase();
                    var itemRating = parseFloat(item.rating);
                    var cuisineList = (item.Cuisines.toLowerCase()).split(", "); //array of cuisines
                     console.log(cuisineList);
                    
                    // if( (address.includes(location) || location == "")
                    if(( (itemRating >= rating && itemRating < rating+1 )|| rating == 0)
                    && (cuisineList.indexOf( cuisine ) != -1 || cuisine == "0")
                
                ) { //if location is matched 
                        console.log(item.Name);
                        addMarker(item.Longitude, item.Latitude , item.Name);

                        nodeTemplate = nodeTemplate + `<div class="restaurant">
                        <!--<div class="img-container">
                            <img src=${item.image}></img>
                        </div>-->

                        <div class="data-container">
                            <div><h4>${item.Name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${item.rating} </h4></div>
                            <div> ${item.Cuisines}</div>
                            <div> Address: ${item.Address}</div>       
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
            zoom: 5,
            center: new google.maps.LatLng(28.5383,-81.3792),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
          });
          
          // Create a <script> tag and set the USGS URL as the source.
          var script = document.createElement('script');
     
          script.src = onLoadHandler();
          document.getElementsByTagName('head')[0].appendChild(script);
        }

        // Adds a marker to the map and push to the array.
        function addMarker(longitude, latitude, restaurantName){
            // var rs = location.split(",");
            // console.log(parseFloat(rs[0]));
            // var myLatLng = {lat: parseFloat(rs[0]), lng: parseFloat(rs[1])};
            var myLatLng = {lat: latitude, lng: longitude};
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
    
