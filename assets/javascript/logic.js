
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

	if ($(document).scrollTop() > 650){
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


$("#media").addClass("show")
//global hides
 $("#youtube").addClass("hide");
 $("#googleSearch").addClass("hide");
 $("ul").addClass("hide");
 $("#userSearch").addClass("hide");




//on click for videos
$('#videos').on('click', function() {
	$("#googleSearch").empty();
	$("#youtube").toggleClass("show")
	$("#googleSearch").removeClass("show")
	$("#userSearch").removeClass("show");
	$("ul").removeClass("show");


	 return false;
	
	});





//ARTICLES API


$("#articles").on("click", function(){
	$("#googleSearch").empty();
	$("ul").toggleClass("show");
	$("#youtube").removeClass("show")
	$("#userSearch").removeClass("show")
	

function runApi(searchTerm) {

	var key = "AIzaSyC6YC_Oa1mPaMfdtU05zp09hlnvg0Zssms"
        $.get({

            url: 'https://www.googleapis.com/customsearch/v1?key=' + key + '&cx=011631025692118016116:tkj65mrqycg&' + searchTerm,
            data: {
                format:'json'
            },

        }).done(function(response){
        	console.log(response.items)
 		function api (a,b,c,d) {
 			var links = a
            var html = b
            var siteImages = c
            var title = d


			var divs = $("<div class='items'>")
			var a = $("<a>")
			var image = $("<img>")

            image.attr("src", siteImages)
            divs.attr("href", links)

            divs.append("<br>" + title + "<br>")
            divs.append(image)
			divs.append("<h2>" + html + "</h2>")
			divs.append("<a href=" + links + ">" + links + "</a><br>")
			
			$("#googleSearch").append(divs); 	

 		}

 	api(response.items[0].link,response.items[0].htmlSnippet,response.items[0].pagemap.cse_thumbnail[0].src, response.items[0].title)        
 	api(response.items[1].link,response.items[1].htmlSnippet,response.items[1].pagemap.cse_thumbnail[0].src, response.items[1].title) 
 	api(response.items[2].link,response.items[2].htmlSnippet,response.items[2].pagemap.cse_thumbnail[0].src, response.items[2].title) 
   	api(response.items[3].link,response.items[3].htmlSnippet,response.items[3].pagemap.cse_thumbnail[0].src, response.items[3].title) 
    api(response.items[4].link,response.items[4].htmlSnippet,response.items[4].pagemap.cse_thumbnail[0].src, response.items[4].title) 


	});

};

$("#essay").on("click", function () {
	$("#googleSearch").empty();
	$("ul").addClass("show")
	$("#googleSearch").addClass("show");
	runApi('q=writing essays');

	 return false;
        
});

$("#financial").on("click", function () {
	$("#googleSearch").empty();
	$("#googleSearch").addClass("show");
	runApi('q=financial aid');

	 return false;
        
});

$("#major").on("click", function () {
	$("#googleSearch").empty();
	$("#googleSearch").addClass("show");
	runApi('q=selecting a major');

	 return false;
        
});

	
return false;	
	
});


//OTHER SECTION!!!! Jeremy


//API Key =1xt9fCjyr3ps1WvOpqEXKMmExAPGx21sqAZJAfGh

//// // USER SEARCH

$("#other").on('click', function() {
	$("#googleSearch").empty();
	$("#userSearch").toggleClass("show")
	$("#youtube").removeClass("show")
	$("ul").removeClass("show")
	// youtubeHide();
	// $("#googleSearch").addClass("hide")
	// $("#googleSearch").removeClass("show")
	// $("ul").addClass("hide");
	// $("ul").removeClass("show")
	// $("#googleSearch").addClass("shows");

   return false
});


$("#search").on('click', function() {
	var userSearch = $("#college-input").val();

    // runApi('q=' + userSearch);

});




//////


//DATA STORAGE

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
	var address = $("#address").val().trim();
	var email = $("#email").val().trim();
	var affiliation = $("input[name=networkSignUp]").val();

//tarting geocoder
	var geocoder = new google.maps.Geocoder();
	var infowindow = new google.maps.InfoWindow();
	var loc = [];
	//var latlng = "default";
		console.log(address);
		codeAddress();

		function codeAddress () {
			geocoder.geocode( { 'address': address}, function(results, status) {
				console.log(results);
				if (status == google.maps.GeocoderStatus.OK) {
					loc[0] = results[0].geometry.location.lat();
        			loc[1] = results[0].geometry.location.lng();
					console.log(loc);
				/*	
					lat = results[0].geometry.location.lat;
					lng = results[0].geometry.location.lng;
					latlng = lat+" ,"+lng;
					console.log(results[0].geometry.location.lat);
				*/
				} else {
					alert('Geocode was not successful for the following reason: '+status);
				}
			});
		};
		console.log("Does loc maintain appropriate scope: ", loc);
	  
		var newMapMarker = {

			firstName: firstName,
			lastName: lastName,
			address: address,
			email: email,
			affiliation: affiliation,
			loc: loc
			
		}

	 	database.ref("newMapMarker").push(newMapMarker);

    

   //If you are able to get markers to work you might  need this code below 
	// //passing city into geocoder for lat long data
	// var geocoder = new google.maps.Geocoder();

	// var geoCode = geocoder.geocode(address);


	// console.log(geoCode);
  
	var newMember = {

		firstName: firstName,
		lastName: lastName,
		address: address,
		email: email,
		affiliation: affiliation
		
	}

 	database.ref("NewMember").push(newMember);

	$("#firstName").val("");
	$("#lastName").val("");
	$("#address").val("");
	$("#email").val("");
	$("#radio input[name=networkSignUp]:checked").val("");

 	return false;

 	//Didn't we have some sort of submission confirmation/close out of the
 	//	registration window after someone hit 'Submit' in a previous version?
 	//
 	//Also, The Network div needs to either grow to fit the size of results or 
 	//	have the number of results displayed limited -- ooooor which might be 
 	//	cool with the map markers -- have a user choose to display mentors or
 	//	mentees, and then filter to display only those results AND to only
 	//	populate the map with the corresponding affiliate markers.

});


//Getting info from firebase
database.ref("NewMember").on("child_added", function(childSnapshot, prevChildKey){
	
	var firstName = (childSnapshot.val().firstName);
	var lastName = (childSnapshot.val().lastName);
	var address = (childSnapshot.val().address);
	var email = (childSnapshot.val().email);
	var affiliation = (childSnapshot.val().affiliation);

	var column = $("<div class='column'>")

	column.append("<br><h3> " + firstName + " " + lastName + "</h3><h3>"
	+ address + "</h3><h3>"
	+ email + "</h3>" 
	+ affiliation + "<br>");

	$("#network").append(column)

	//initMarkers(childSnapshot, prevChildKey);

	return false;
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
			(document.getElementById('address')),
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
          console.log("places: ", places);

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

 //    function initMarkers(childSnapshot, prevChildKey) {

 //    	console.log("inside");
 //    	console.log(childSnapshot);
 //    	console.log(prevChildKey);
		
	// 		var firstName = (childSnapshot.val().firstName);
	// 		var lastName = (childSnapshot.val().lastName);
	// 		var mapLat = (childSnapshot.val().lat);
	// 		var mapLng = (childSnapshot.val().lng);
	// 		var mapMarker = mapLat+", "+mapLng;

	// 		var infowindow = new google.maps.InfoWindow({
	//           content: contentString
	//         });

	// 		var marker = new google.maps.Marker({
	// 			map: map,
	// 			position: mapMarker
	// 		});
	// 		marker.addListener('click', function() {
	// 			infowindow.open(map, marker);
	// 		});

	// 		//console.log("newMapMarker: ",firstName);
	// 		//console.log(mapMarker);

	// 		return false;
	// }


// Working on taking the user-submitted location, passing it through the geocoder,
//	then pushing that value (wish some other info) into a separate FireBase array.
//	After a user has become a new member, populate the map with color coded mentor/mentee
//	markers showing first name, last name and if they're mentor/mentee
//  Side-thought of if someone has rated/viewed/reviewed/clicked enough stuff on the site
//	that the mentor/mentee email will display in their map marker info container.





