let userTrips = [];
let userId;

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

      //Upon submitting a new trip via form, adds to database
      //then renders a new trip div on user's page
  $('#trip-form').submit(function(event) {
    event.preventDefault();
    var formData = $(this).serialize();
    console.log(formData);
    $.post('/userpage/trips', formData, function(trip) {
      renderNewTrip(trip);
      console.log(trip);
    });
    // $.ajax({
    //   method: 'POST',
    //   url: '/userpage/trips',
    //   data: {
    //     place: formData.place,
    //     sights: formData.sights,
    //     foods: formData.foods,
    //     activities: formData.activities,
    //     // user: userId
    //     },
    //   success: function(trip) {
    //     renderNewTrip(trip);
    //     console.log(trip);
    //   }
    // });
    $(this).trigger("reset");
  });

    // renders a new trip on the page
  function renderNewTrip(trip) {
    console.log('rendering trip ' +trip._id);
    // userTrips.push(trip); not sure I need this anymore
    var tripHtml =
    "<div class ='col-4 onetrip' id="+trip._id+">"+
      // "<i class='fa fa-suitcase' aria-hidden='true'></i>"+
          //List that populates from form
      "<ul class = 'newtripcard' style='list-style-type:none'>"+
        "<li><h3 id='city'>"+trip.place+"</h3></li>"+
        "<li><span class='tripsights'>Sights: "+trip.sights+"</span></li>"+
        "<li><span class='tripfoods'>Foods: "+trip.foods+"</span></li>"+
        "<li><span class='tripactivities'>Activities: "+trip.activities+"</span></li>"+
      "</ul>"+
          //buttons that populate on each trip card
      "<div class='btn-group tripbuttons'>"+
        "<button type='button' id='editbutton' data-id='" +trip._id+ "'>Edit</button>"+
        "<button type='button' id='deletebutton' data-id='" +trip._id+ "'>Delete</button>"+
      "</div>"+

    "</div>";

    $('#tripcards').append(tripHtml);

      //Sends to delete a tripcard on the backend
    $('#deletebutton').click(function() {
      let id= $(this).data('id');
      console.log('Deleting trip id ', id);
      $.ajax({
        method: 'DELETE',
        url: '/userpage/trips/'+id,
        success: deleteTrip
      });
      return;
    });

      //Deletes a book on the front end by looping through their trip array
    function deleteTrip(deletedTrip) {
      console.log(deletedTrip);
      let oneTrip = deletedTrip;
      let tripId = deletedTrip._id;
      // for(let i=0; i< userTrips.length; i++) {
      //   if(userTrips[i]._id === tripId) {
      //     userTrips.splice(i, 1);    not sure I need this anymore
      removeTripcard(tripId);
          // break;
        // }
      return;
    }

      function removeTripcard(tripId) {
        $('#'+tripId).remove();
      }
    // }
  }
});


