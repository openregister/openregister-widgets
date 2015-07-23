var initAutoComplete = function() {
    $('.auto-suggest').selectToAutocomplete();
};

var renderCountries = function(countries) {
    countries.sort(function(a,b) {
        return a.entry.country.localeCompare(b.entry.country);
    });
    var template = $.templates("#country-template");
    $.each(countries, function(index, country) {
        var html = template.render({
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
        renderCountries(data['entries']);
      },
      error: function(xhr, options, error) {
            console.log(error);
      }
    });
};

$(document).ready(function() {
    loadCountries();
});
