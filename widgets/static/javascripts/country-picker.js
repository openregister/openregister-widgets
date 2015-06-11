var initAutoComplete = function(){
    $('.auto-suggest').selectToAutocomplete();
        $('#country-form').submit(function(){
        alert("You chose: " + $(this).serialize() );
        $('#country-form').trigger("reset");
        return false;
    });
};

var renderCountries = function(countries) {
    countries.sort(function(a,b) {
        return a.entry.country.localeCompare(b.entry.country);
    });
    $.each(countries, function(index, country) {
        var template = $.templates("#country-template"),
            html = template.render({
                    'country': country.entry.country,
                    'name': country.entry.name
                });
        $('#country-selector').append(html);
    });
    initAutoComplete();
};


var loadCountries = function() {
    $.ajax({
      type: 'GET',
      url: 'http://country.openregister.org/all.json',
      contentType: 'application/json',
      success: function(data) {
        renderCountries(data);
      },
      error: function(xhr, options, error) {
        if(xhr.status == 404) {
            console.log(error);
        }
    }});
};

$(document).ready(function(){
    loadCountries();
});
