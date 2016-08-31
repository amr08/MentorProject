$(document).ready(function(){

////FRONT END JS////////
	$(window).scroll(function(){

		$("#heading").css({"opacity" : 1-(($(this).scrollTop())/300)
		});

		$("#title").css({"opacity" : 1-(($(this).scrollTop())/300)
		});


	});

//////END FRONT END JS///////





});