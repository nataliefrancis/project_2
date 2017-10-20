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
  }
  
}
