
$(document).ready(function(){

 	$('.auto-suggest').selectToAutocomplete();
		$('form').submit(function(){
		alert("You chose: " + $(this).serialize() );
		return false;
	});

});
