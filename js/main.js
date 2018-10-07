  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDabit4FOTQ2CSZ0vUh6HONuvwL3DUGuR0",
    authDomain: "reservation-site-b42cc.firebaseapp.com",
    databaseURL: "https://reservation-site-b42cc.firebaseio.com",
    projectId: "reservation-site-b42cc",
    storageBucket: "reservation-site-b42cc.appspot.com",
    messagingSenderId: "147043216796"
  };
  firebase.initializeApp(config);


var database = firebase.database();

// create reservationData object which will be populated with user input
var reservationData = {};

/* set the day when an option is clicked on
$('.reservation-day li').on('click', function() {
  reservationData.day = $(this).text();
});*/

$('.reservation-day').on('change', function() {
  reservationData.day = $(":selected").text();
});


$('.reservation-time').on('change', function() {
  reservationData.time = $(":selected").text();
});


/* set the time when an option is clicked on
$('#reservation-time select').on('change', function() {
  reservationData.time = $(this).text();
});

$( "#reservation-time" ).change(function() {
  reservationData.time = $(this).text();
}); */





// when submitted, the name data should be set
// and all data should be sent to your database
$('.reservation-form').on('submit', function(event) {
  event.preventDefault();

  reservationData.name = $('.reservation-name').val();


  // create a section for reservations data in your db
  var reservationsReference = database.ref('reservations');

  reservationsReference.push(reservationData);
});


// retrieve reservations data when page loads and when reservations are added
function getReservations() {

  // use reference to database to listen for changes in reservations data
  database.ref('reservations').on('value', function(results) {

    // Get all reservations stored in the results we received back from Firebase
    var allReservations = results.val();

    // remove all list reservations from DOM before appending list reservations
    $('.reservations').empty();

    // iterate (loop) through all reservations coming from database call
    for (var reservation in allReservations) {

      // Create an object literal with the data we'll pass to Handlebars
      var context = {
        name: allReservations[reservation].name,
        day: allReservations[reservation].day,
        time: allReservations[reservation].time,
        reservationId: reservation
      };


      // Get the HTML from our Handlebars reservation template
      var source = $("#reservation-template").html();

      // Compile our Handlebars template
      var template = Handlebars.compile(source);

      // Pass the data for this reservation (context) into the template
      var reservationListItem = template(context);

      // Append newly created reservation to reservations list.
      $('.reservations').append(reservationListItem);

    }

  });

}

// When page loads, get reservations
getReservations();





















function initMap() {
	
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8054491, lng: -73.9654415},
    zoom: 20,
    
	  zoomControl: false,
	  mapTypeControl: true,
	  scaleControl: true,
	  streetViewControl: true,
	  rotateControl: true,
	  fullscreenControl: true,
	  
	  styles: styles
    
  });

	var styles = [
		
		{
			stylers: [
				
				{hue: '#00ffe6'},
				{saturation: -20}
				
			]
			
		}
		
	];
	
	var marker = new google.maps.Marker ({
		
		position: {lat: 40.8054491, lng: -73.9654415},
		map: map
		
	});
	

}
