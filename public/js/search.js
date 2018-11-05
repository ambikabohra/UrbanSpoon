
var map;
var markers = [];
var restaurantResponse = "";
var seriesDataOrlando = [];
var seriesDataAlbany = [];
var seen = false;

function onLoadHandler() {
    clearMarkers();
    const list = document.getElementById("restaurant-list");
    const location = document.getElementById("location").value;
    console.log("given locations is " + location);
    const data = {
        location: location
    };

    fetch("/search-restaurants", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(r => r.json())
        .then(response => {
            if (Array.isArray(response.restaurants)) {
                console.log('Success:', JSON.stringify(response));
                restaurantResponse = response.restaurants ;
                appendRestaurants(list, response.restaurants, location);
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
     var seriesData = []; //array as a map for highcharts
    const rating = parseFloat(document.getElementById("selectRating").value);
    const cuisine = (document.getElementById("selectCuisine").value).toLowerCase();
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
    let nodeTemplate = "";
                        
    array.forEach(item => {
    var address = item.Address.toLowerCase();
    var itemRating = parseFloat(item.rating);
    var cuisineList = (item.Cuisines.toLowerCase()).split(", "); //array of cuisines

    // if(seen == false){
        if(item.City == 'Orlando' && !seriesDataOrlando.includes(item.Name))
        { 
           seriesDataOrlando.push([item.Name, item.rating]);
        }
        else if(item.City == 'Albany' && !seriesDataAlbany.includes(item.Name))
        { 
            seriesDataAlbany.push([item.Name, item.rating]);
        }
    //     seen = true;
    //  }

   if(( (itemRating >= rating && itemRating < rating+1 )|| rating == 0)
       && (cuisineList.indexOf( cuisine ) != -1 || cuisine == "0")
    ) { //if location is matched 
      addMarker(item.Longitude, item.Latitude , item.Name);
    //   seriesData.push([item.Name, item.rating]);
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
        // makeGraphs(seriesData); //call to highcharts
        makeGraphs();
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
        center: new google.maps.LatLng(28.5383, -81.3792),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
    });

    // Create a <script> tag and set the USGS URL as the source.
    var script = document.createElement('script');

    script.src = onLoadHandler();
    document.getElementsByTagName('head')[0].appendChild(script);
}

// Adds a marker to the map and push to the array.
function addMarker(longitude, latitude, restaurantName) {
    // var rs = location.split(",");
    // console.log(parseFloat(rs[0]));
    // var myLatLng = {lat: parseFloat(rs[0]), lng: parseFloat(rs[1])};
    var myLatLng = { lat: latitude, lng: longitude };
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
    infowindow.open(map, marker);
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
window.eqfeed_callback = function (results) {
    for (var i = 0; i < results.features.length; i++) {
        var coords = results.features[i].geometry.coordinates;
        var latLng = new google.maps.LatLng(coords[1], coords[0]);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
    }
}

//  $(document).ready(function () {
    function makeGraphs(){
    var chart = Highcharts.chart({
    chart: {
        renderTo: 'container',
        type: 'column'
    },
   
    title: {
        text: 'Restaurants Rating Comparison'
    },

    legend: {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical'
    },

    rangeSelector: {
        selected: 4
    },

    xAxis: {
        minPadding: 0.05,
        maxPadding: 0.05,
        type: 'category',
        title: {
            text: 'Restaurants'
        },
       labels: {
                x: -10
            }
    },
    yAxis: {
        allowDecimals: false,
        title: {
            text: 'Rating'
        }
    },
    labels: {
        formatter: function () {
            return (this.value );
        }
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.label}'
            },
        tooltip: {
            formatter: function () {
                return '<b>' +'</b><br/>' +
                   + this.point.y ;
            }
        }
        },
        spline: {
        marker: {
        enabled: true
    }
    }
},

    series: [{
        name: 'Orlando',
        data: seriesDataOrlando
    }, {
        name: 'Albany',
        data: seriesDataAlbany
    }],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                    layout: 'horizontal'
                },
                yAxis: {
                    labels: {
                        align: 'left',
                        x: 0,
                        y: -5
                    },
                    title: {
                        text: null
                    }
                },
                subtitle: {
                    text: null
                },
                credits: {
                    enabled: false
                }
            }
        }]
    }
    }); 
};
