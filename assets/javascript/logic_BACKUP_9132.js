
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

	var newMember = {

		firstName: firstName,
		lastName: lastName,
		city: city,
		state: state,
		email: email,
		affiliation: affiliation,
		
	}

 	database.ref("NewMember").push(newMember);

	console.log(newMember.firstName);
	console.log(newMember.lastName);
	console.log(newMember.city);
	console.log(newMember.state);
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
	var email = (childSnapshot.val().email);
	var affiliation = (childSnapshot.val().affiliation);
	
	console.log(firstName);
	console.log(lastName);
	console.log(city);
	console.log(state);
	console.log(email);
	console.log(affiliation);

//decide where to print out on html
//add search option? too much?

 });


//on click for videos
<<<<<<< HEAD
$('body').on('click', '#videos', function() {
		console.log("video click event listener is working");

		if (document.getElementById('media').style.height == '20%') {
			document.getElementById('media').style.height = '80%';
			document.getElementById('videoContainer').style.display = 'block'; 
			console.log("Amazing what you'll find");
		} else {
			document.getElementById('media').style.height = '20%';
			document.getElementById('videoContainer').style.display = 'none'; 
			console.log("face to face");
		}
});

//GoogleMaps API logic

	var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }
=======
$("#youtube").addClass("hides");

$('#videos').on('click', function() {
	$("#youtube").removeClass("hides");
	  $("#youtube").addClass("shows");
	});
>>>>>>> afceae834c78425b0c7c11e853770c31d5fc44cd

});

  var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }