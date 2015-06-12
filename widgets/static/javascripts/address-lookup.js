var addressLookup = function(event) {
    var input = $("#address-lookup :input[name='search']"),
        searchValue = input.val().trim();
    event.preventDefault();
    $('.results').empty();
    $('.message').empty();


    $.ajax({
          type: 'GET',
          url: 'http://address.openregister.org/search?_query='+searchValue+'&_representation=json',
          contentType: 'application/json',
          success: function(data) {
            renderAddresses(data);
          },
          error: function(xhr, options, error) {
            console.log(error);
            $('.results').empty();
            $('.message').text('No results');
        }
    });

};

var renderAddresses = function(addresses) {
    //TODO get server to sort results
    $.each(addresses, function(index, address) {
        var template = $.templates("#address-template"),
            html = template.render({
                    'property': address.entry.property,
                    'street': address.entry.street,
                    'town': address.entry.town,
                    'postcode': address.entry.postcode
                });
        $('.results').append(html);
    });
};

$(document).ready(function(){
    $('#address-lookup').submit(addressLookup);
});
