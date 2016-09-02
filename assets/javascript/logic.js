$(document).ready(function(){



////FRONT END JS////////
	$(window).scroll(function(){

		$("#heading").css({"opacity" : 1-(($(this).scrollTop())/300)

		
		});

		$("#title").css({"opacity" : 1-(($(this).scrollTop())/300)
			
			
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

//dropdown

$("#dropDown").hide();

$("#menu").on("click", function(){
	$("#dropDown").toggleClass("show");
});
//////END FRONT END JS///////


//clears search box content//

	$(".clearText").on("click", function() {
		$("#theme-form input").val("");
	});


});