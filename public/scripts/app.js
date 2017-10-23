let userTrips = [];
let userId;
let $tripcards;
let template;

// Generates the google map
function initMap() {
    
  // Generates a new map, zoomed to country
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,  //starting location is Denver
    center: {lat: 39.742043, lng: -104.991531}
  });

  // Allows user to drop a marker where they click
  map.addListener('click', function (e) {
    placeMarkerAndPanTo(e.latLng, map);
  });

  function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({   //Type of marker
      position: latLng,
      map: map
    });

    // recenter the map to where the marker was pinned
    map.panTo(latLng);

        // creating an info window that populates location
    var infowindow = new google.maps.InfoWindow({
      content: "I will show a city name"
      // document.getElementById('city')
    });

          // when the marker is clicked, the info winder pops up.
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
      });
    }
}

      // Adds a search box to a map, using the Google Place Autocomplete
      // feature. People can enter geographical searches. The search box will return a
      // pick list containing a mix of places and predicted search terms.
function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13,
      mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

    // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

$(document).ready(function() {
  console.log("app.js is ready");

    // Gets the user's ID and stores it in the front end
  $.ajax({
    method: 'GET',
    url: '/user',
    success: function(result) {
      userId = result;
      console.log(userId);
    }
  });

  $tripcards = $('#tripcards');

  //compile handlebars template
  let source = $('#trip-template').html();
  template = Handlebars.compile(source);

  
    //This gets all trips, not currently user specific
  $.ajax({
      method: 'GET',
      url: '/userpage/trips',
      success: handleSuccess,
      error: handleError
    });

      //When a new trip is submitted via form
    $('#trip-form').on('submit', function(event) {
      event.preventDefault();
      console.log('new trip serialized', $(this).serializeArray());
      $.ajax({
        method: 'POST',
        url: '/userpage/trips',
        data: $(this).serializeArray(),
        success: newTripSuccess,
        error: newTripError
      });
    });

      //When a tripcard delete button is clicked
    $tripcards.on('click', '#deletebutton', function() {
      console.log('clicked delete button for ' +$(this).attr('data-id'));
      let id = $(this).attr('data-id');
      $.ajax({
        method: 'DELETE',
        url: '/userpage/trips/'+id,
        success: deleteTripSuccess,
        error: deleteTripError
      });
    });

}); // <-- end of document.ready

  // helper function to render all posts to view, it re-renders each time we call it
  function render () {
    $tripcards.empty(); // empty existing posts from view
    let tripHtml = template({ trip: userTrips });   // pass the user trips into the handlebars template
    $tripcards.append(tripHtml);    // append html to the view
  }

  function handleSuccess(json) {
    userTrips = json;
    render();
  }

  function handleError(e) {
    console.log('Something went wrong getting all trips.');
    $('#tripcards').text('Failed to load trips, is the server working?');
  }

  function newTripSuccess(trip) {
    $('#trip-form input').val('');
    userTrips.push(trip);
    render();
  }

  function newTripError() {
    console.log('newtrip error!');
  }

  function deleteTripSuccess(trip) {
    let delTrip = trip;
    console.log(trip);
    var tripId = trip._id;
    console.log('delete trip', tripId);
    // find the trip with the correct ID and remove it from the usertrip array
    for(var i = 0; i < userTrips.length; i++) {
      if(userTrips[i]._id === tripId) {
        userTrips.splice(i, 1);
        break; 
      }
    }
    render();
  }

  function deleteTripError() {
    console.log('deletetrip error!');
  }






 