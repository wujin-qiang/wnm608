const penLightBox = function(event){
	console.log(event.target.src);

	//Change the content of the lightbox
	$(".lightbox-content").html("<img src='" + event.target.src + "'>");

	//Add a class to the lightbox to show it
	$(".lightbox").addClass("active");
}


//Document Ready
$(function(){

	$("body").on("click", ".gallery img", penLightBox);

	$(".lightbox-back").on("click", function(){
		$(".lightbox").removeClass("active");
	})
	
	


});