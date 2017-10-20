console.log("app.js is ready");

function initMap() {
  

  // Generates a new map, zoomed to country
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
      //starting location is Denver
    center: {lat: 39.742043, lng: -104.991531}
  });

  // Allows user to drop a marker where they click
  map.addListener('click', function (e) {
    placeMarkerAndPanTo(e.latLng, map);
  });

  function placeMarkerAndPanTo(latLng, map) {
    //Type of marker
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });

    // recenter the map to where the marker was pinned
    map.panTo(latLng);

       //when the marker is clicked, a box opens
    google.maps.event.addListener(map, 'click', function(event) {
      placeMarker(map, event.latLng);
    });

    function placeMarker(map, location) {
      var marker = new google.maps.Marker({
        position: location,
        map: map
      });

      var infowindow = new google.maps.InfoWindow({
        content: 'Latitude: ' + location.lat() +
        '<br>Longitude: ' + location.lng()
      });

      infowindow.open(map, marker);
    }
      
  }

}
  
    //Upon submitting a new trip via form, adds to database
    //then renders a new trip div on user's page
$('#trip-form').submit(function(event) {
    event.preventDefault();
    var formData = $(this).serialize();
    console.log(formData);
    $.post('/trips', formData, function(trip) {
      // renderNewTrip(trip);
      console.log(trip);
    });
    $(this).trigger("reset");
  });
