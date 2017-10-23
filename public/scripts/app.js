let userTrips = [];
let userId;

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

$(document).ready(function() {
  console.log("app.js is ready");

    // Gets the user's id to use
  $.ajax({
    method: 'GET',
    url: '/user',
    success: function(result) {
      userId = result;
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
    userTrips.push(trip);
    var tripHtml =
    "<div class ='col-4' id='onetrip'>"+
      // "<i class='fa fa-suitcase' aria-hidden='true'></i>"+
          //List that populates from form
      "<ul class = 'newtripcard' style='list-style-type:none'>"+
        "<li><h3>"+trip.place+"</h3></li>"+
        "<li><span class='tripsights'>Sights: "+trip.sights+"</span></li>"+
        "<li><span class='tripfoods'>Foods: "+trip.foods+"</span></li>"+
        "<li><span class='tripactivities'>Activities: "+trip.activities+"</span></li>"+
      "</ul>"+
          //buttons that populate on each trip card
      "<div class='btn-group tripbuttons' data-toggle='buttons'>"+
        // "<label class='btn btn-secondary'>"+
        //   "<input type='radio' name='edit' id='editbutton' autocomplete='off'> Edit"+
        // "</label>"+
        // "<label class='btn btn-secondary'>"+
        //   "<input type='radio' name='delete' id='deletebutton' data-id='" +trip._id+ "' autocomplete='off'> Delete"+
        // "</label>"+
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
    });

      //Deletes a book on the front end by looping through their trip array
    function deleteTrip(deletedTrip) {
      console.log(deletedTrip);
      let oneTrip = deletedTrip;
      let tripId = deletedTrip._id;
      for(let i=0; i< userTrips.length; i++) {
        if(userTrips[i]._id === tripId) {
          userTrips.splice(i, 1);
          removeTripcard();
          // break;
        }
      }
      function removeTripcard() {
        $('#onetrip').remove();
      }
    }
    // break;
   }
});


