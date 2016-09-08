
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



//global hides
 $("#youtube").addClass("hides");
 $("#googleSearch").addClass("hides");
 $("ul").addClass("hides");
 $("#userSearch").addClass("hides");



//on click for videos
$('#videos').on('click', function() {
	$("#googleSearch").empty();
	$("ul").addClass("hides");
	$("ul").removeClass("shows");
	$("#media").addClass("shows");
	$("#youtube").toggleClass("shows")

	 return false;
	
	});

});



//ARTICLES API


$("#articles").on("click", function(){
	$("#googleSearch").empty();
	$("#media").addClass("shows");
	$("#media").removeClass("hides");
	$("#youtube").addClass("hide");
	$("#youtube").removeClass("shows");
	$("#googleSearch").toggleClass("shows");
	$("ul").toggleClass("shows");
	

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
	$("#googleSearch").addClass("shows");
	runApi('q=writing essays');

	 return false;
        
});

$("#financial").on("click", function () {
	$("#googleSearch").empty();
	$("#googleSearch").addClass("shows");
	runApi('q=financial aid');

	 return false;
        
});

$("#major").on("click", function () {
	$("#googleSearch").empty();
	$("#googleSearch").addClass("shows");
	runApi('q=selecting a major');

	 return false;
        
});

	



return false;	
	
});




// $("#search").on('click', function() {
// 	console.log("works")
// 	var userSearch = $("#theme-input").val();
//     console.log(userSearch)

//     // runApi('q=' + userSearch);

// });

// //// // USER SEARCH

// $("#other").on('click', function() {
// 	$("#userSearch").toggleClass("shows")
// 	$("#googleSearch").empty();
// 	$("#googleSearch").addClass("shows");

//    return false
// });




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
	var city = $("#city").val().trim();
	var state = $("#state").val();
	var email = $("#email").val().trim();
	var affiliation = $("input[name=networkSignUp]").val();

	var newMember = {

		firstName: firstName,
		lastName: lastName,
		city: city,
		state: state,
		email: email,
		affiliation: affiliation
		
	}

 	database.ref("NewMember").push(newMember);

	console.log(newMember.firstName);
	console.log(newMember.lastName);
	console.log(newMember.city);
	console.log(newMember.state);
	console.log(newMember.email);
	console.log(newMember.affiliation);
	
 	

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
	var email = (childSnapshot.val().email);
	var affiliation = (childSnapshot.val().affiliation);
	
	console.log(firstName);
	console.log(lastName);
	console.log(city);
	console.log(state);
	console.log(email);
	console.log(affiliation);

$("#network").append("<br><h3> " + firstName + " " + lastName + "</h3><h3>"
	+ city + ", " + state + "</h3><h3>"
	+ email + "</h3>" 
	+ affiliation + "<br>");

 });





///MAPS
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 40.731, lng: -73.997}
  });
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;

  document.getElementById('submit').addEventListener('click', function() {
    geocodeLatLng(geocoder, map, infowindow);
  });
}

function geocodeLatLng(geocoder, map, infowindow) {
  var input = document.getElementById('latlng').value;
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === 'OK') {
      if (results[1]) {
        map.setZoom(11);
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}


