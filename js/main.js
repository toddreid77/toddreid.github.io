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

/* set the day when an option is clicked on - original js for
$('.reservation-day li').on('click', function() {
  reservationData.day = $(this).text();
}); */


// when submitted, the name data should be set
// and all data should be sent to your database
$('.reservation-form').on('submit', function(event) {
  event.preventDefault();

  reservationData.name = $('.reservation-name').val();

  reservationData.day = $('.reservation-day').val();

  reservationData.time = $('.reservation-time').val();
  

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


/* Google map init */


      function initMap() {
	      
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          styles: [
    {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [
            {
                "color": "#613e65"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        featureType: "landscape",
        elementType: "all",
        stylers: [
            {
                "color": "#fcf8f7"
            }
        ]
    },
    {
        featureType: "landscape.natural",
        elementType: "geometry.fill",
        stylers: [
            {
                "visibility": "on"
            },
            {
                "color": "#e8eeea"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "all",
        stylers: [
            {
                "visibility": "on"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "all",
        stylers: [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            },
            {
                "visibility": "simplified"
            },
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                "visibility": "on"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
            {
                "visibility": "on"
            },
            {
                "color": "#e3cbd2"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [
            {
                "visibility": "on"
            },
            {
                "color": "#ececec"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
            {
                "visibility": "off"
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "geometry.fill",
        stylers: [
            {
                "visibility": "simplified"
            },
            {
                "color": "#dddddd"
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "geometry.stroke",
        stylers: [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        featureType: "transit",
        elementType: "all",
        stylers: [
            {
                "visibility": "off"
            }
        ]
    },
    {
        featureType: "water",
        elementType: "all",
        stylers: [
            {
                "color": "#a192a3"
            },
            {
                "visibility": "on"
            }
        ]
    }
],

          center: {lat: 40.8054491, lng: -73.9654415}
        });
        
        
        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<div id="bodyContent">'+
            '<p class="info-window">Salad! What was I thinking? Women don\'t respect salad eaters.</p>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        
        
        
        var image = 'images/headsot.png';
        var beachMarker = new google.maps.Marker({
          position: {lat: 40.8054491, lng: -73.9654415},
          map: map,
          icon: image
        });
        
        beachMarker.addListener('click', function() {
          infowindow.open(map, beachMarker);
        });
        
        
      }


/* Show reservation details in success modal */

		$('.reservation-button').on('click', function () {
			
		var dinersName = $("#diners-name").val();	
		var dinersDay = $("#diners-day option:selected").val();	
		var dinersTime = $("#diners-time option:selected").val();	
		
			$('.show-reservation-name').html('Thanks ' + dinersName + '. We will see you on ' + dinersDay + ' at ' + dinersTime);
		
		});


/* Open times */

var now = new Date();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var checkTime = function() {
  var today = weekday[now.getDay()];
  var timeDiv = document.getElementById('timeDiv');
  var dayOfWeek = now.getDay();
  var hour = now.getHours();
  var minutes = now.getMinutes();

  //add AM or PM
  var suffix = hour >= 12 ? "PM" : "AM";

  // add 0 to one digit minutes
  if (minutes < 10) {
    minutes = "0" + minutes
  };

  if ((dayOfWeek == 0 || dayOfWeek == 6) && hour >= 13 && hour <= 23) {
    hour = ((hour + 11) % 12 + 1); //i.e. show 1:15 instead of 13:15
    timeDiv.innerHTML = 'it\'s ' + today + ' ' + hour + ':' + minutes + suffix + ' - we\'re open!';
    timeDiv.className = 'open';
  } 
  
  else if ((dayOfWeek == 3 || dayOfWeek == 4 || dayOfWeek == 5) && hour >= 16 && hour <= 23) {
    hour = ((hour + 11) % 12 + 1);
    timeDiv.innerHTML = 'it\'s ' + today + ' ' + hour + ':' + minutes + suffix + ' - we\'re open!';
    timeDiv.className = 'open';
  } 
  
  else {
    if (hour == 0 || hour > 12) {
      hour = ((hour + 11) % 12 + 1); //i.e. show 1:15 instead of 13:15
    }
    timeDiv.innerHTML = 'It\'s ' + today + ' ' + hour + ':' + minutes + suffix + ' - we\'re closed!';
    timeDiv.className = 'closed';
  }
};

var currentDay = weekday[now.getDay()];
var currentDayID = "#" + currentDay; //gets todays weekday and turns it into id
$(currentDayID).toggleClass("today"); //hightlights today in the view hours modal popup

setInterval(checkTime, 1000);
checkTime();


/* Custom select option styling */

var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);




/* adding some styling on hover */
	

	
	    $("#toms").hover(
          
         function() {
          $(this).addClass( "blend" );
         }, function() {
          $(this).removeClass( "blend" );
         }
          
         );
         
           
         $( "#quote-section" ).hover(
         function() {
	      $(this).addClass("gradient-bg");   
	      $("h4").addClass("white");
          $("img").addClass( "jerry" );
          $("blockquote").addClass( "underline" );
         }, function() {
	      $(this).removeClass("gradient-bg");   
	      $("h4").removeClass("white");
          $("img").removeClass( "jerry" );
          $( "blockquote" ).removeClass( "underline" );
         }
         );	    

















