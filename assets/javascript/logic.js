$(document).ready(function(){

////FRONT END JS////////
	$(window).scroll(function(){

		$("#heading").css({"opacity" : 1-(($(this).scrollTop())/300)
		});

		$("#title").css({"opacity" : 1-(($(this).scrollTop())/300)
		});


	});


$("#menu").mouseover(function(){
	$("#menu").append("<p> Drop Down Menu</p>")
});
//////END FRONT END JS///////


//clears search box content//

	$(".clearText").on("click", function() {
		$("#theme-form input").val("");
	});


});