
$(document).ready(function(){

 	$('.auto-suggest').selectToAutocomplete();
		$('#country-form').submit(function(){
		alert("You chose: " + $(this).serialize() );
        $('#country-form').trigger("reset");
		return false;
	});

});
