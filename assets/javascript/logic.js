
$(document).ready(function(){


$.stellar();

////FRONT END JS////////
$(window).scroll(function(){

	$("#heading").css({"opacity" : 1-(($(this).scrollTop())/550)
		
	});

	$("#title").css({"opacity" : 1-(($(this).scrollTop())/550)
			
			
	});


});


$(document).on("scroll", function() {

	if ($(document).scrollTop() > 600){
		$("#menu").fadeIn();
		$("#menu").removeClass("hide");
		$("#menu").addClass("show");

	}

	else {

		$("#menu").removeClass("show");
		$("#menu").addClass("hide");

	 }
		

});	

//about modal click listener
$("#about").on("click", function(){
	$('#aboutModal').modal('show');
});

//Dropdown Nav Menu

	$("#dropDown").hide();

	$("#menu").on("click", function(){

		$("#dropDown").toggleClass("show");
	});

//mentor network

	$("#form").addClass('hide');

	$("#mentor").on("click", function() {

		$('#mentorModal').modal('show');

	});

	$("#mentee").on("click", function() {

		$('#menteeModal').modal('show');

	});

	$(".cancel").on("click", function() {
	  	$('.modal').modal('hide');
	  	$('#form').addClass('hide');
	});

	$(".ok").on("click", function() {
	  	$('.modal').modal('hide');
	  	$('#form').addClass('show');

	});

	$('.ui.radio.checkbox').checkbox();


//clears any box content  -not used yet//

	$(".clearText").on("click", function() {
		$("#theme-form input").val("");
	});


 //////END FRONT END JS///////


//Data Storage

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCdRBi1Jrb3Tgw3EFQelne-sIuFB9-7XTQ",
    authDomain: "mentor-network.firebaseapp.com",
    databaseURL: "https://mentor-network.firebaseio.com",
    storageBucket: "mentor-network.appspot.com",
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //-----------------------

//On click listener to add user data
$("#submit").on("click", function() {

//grabs user input
	var firstName = $("#firstName").val().trim();
	var lastName = $("#lastName").val().trim();
	var city = $("#city").val().trim();
	var state = $("#state").val();
	var email = $("#email").val().trim();
	var affiliation = $("input[name=networkSignUp]").val();

	//passing city into geocoder for lat long data
	var geocoder = new google.maps.Geocoder();

	var address = geocoder.geocode(city);
	console.log(address);

	var newMember = {

		firstName: firstName,
		lastName: lastName,
		city: city,
		state: state,
		address: address,
		email: email,
		affiliation: affiliation,
		
	}

 	database.ref("NewMember").push(newMember);

	console.log(newMember.firstName);
	console.log(newMember.lastName);
	console.log(newMember.city);
	console.log(newMember.state);
	console.log(newMember.address);
	console.log(newMember.email);
	console.log(newMember.affiliation);
	
 	alert("Member successfully added");

	$("#firstName").val("");
	$("#lastName").val("");
	$("#city").val("");
	$("#state").val("");
	$("#email").val("");
	$("#radio input[name=networkSignUp]:checked").val("");

 	return false;

});


//Getting info from firebase
database.ref("NewMember").on("child_added", function(childSnapshot, prevChildKey){
	
	var firstName = (childSnapshot.val().firstName);
	var lastName = (childSnapshot.val().lastName);
	var city = (childSnapshot.val().city);
	var state = (childSnapshot.val().state);
	var address = (childSnapshot.val().address);
	var email = (childSnapshot.val().email);
	var affiliation = (childSnapshot.val().affiliation);
	
	console.log(firstName);
	console.log(lastName);
	console.log(city);
	console.log(state);
	console.log(address);
	console.log(email);
	console.log(affiliation);

//decide where to print out on html
//add search option? too much?

 });


//on click for videos

$("#youtube").addClass("hides");

$('#videos').on('click', function() {
	$("#youtube").removeClass("hides");
	  $("#youtube").addClass("shows");
	});

});

//For handling multiple callbacks from two maps functions on this page
	function initialize() {
		initMap();
		initAutocomplete();
	}

//Attempting to load geolocation search box in mentor/mentee form

	function initAutocomplete() {
		autocomplete = new google.maps.places.Autocomplete(
			(document.getElementById('city')),
			{types: ['geocode']});
		autocomplete.addListener('places_changed', function() {
			var places = searchBox.getPlaces();
        	if (places.length == 0) {
        		return;
        	}
		});
	}

//Initial map Andrea got to load with hard-coded location
  var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 35.7796, lng: -78.6382},
          zoom: 8
        });

        //changes I've made
        // creating the searchbox and linking it to the UI element
        var input = document.getElementById('pac_input');//originally 'pac-input' insteady of 'city'
        console.log("input: ",input);
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // bias the searchbox results toward current map's viewport
        map.addListener('bounds_changed', function() {
        	searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // listen for the event fired when the user selects a prediction and retrieve
        // more details for that place
        searchBox.addListener('places_changed', function() {
        	var places = searchBox.getPlaces();
        	if (places.length == 0) {
        		return;
        	}

        	markers.forEach(function(marker) {
        		marker.setMap(null);
        	});
        	markers = [];
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
      })
    }




