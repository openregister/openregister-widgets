
$(document).ready(function(){

 	$('.auto-suggest').selectToAutocomplete();
		$('form').submit(function(){
		alert( $(this).serialize() );
		return false;
	});

});
