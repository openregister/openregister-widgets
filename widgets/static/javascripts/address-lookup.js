var addressLookup = function(event) {
    var input = $("#address-lookup :input[name='search']"),
        searchValue = input.val().trim();
    event.preventDefault();
    $('#address-results').hide();
    $('#results').empty();
    $('.message').empty();

    $.ajax({
          type: 'GET',
          url: 'http://address.openregister.org/search?_query='+searchValue+'&_representation=json',
          contentType: 'application/json',
          success: function(data) {
            if(data.length > 1000){
                $('.message').text('Too many results. Search for for something more specific.');
            } else {
                renderAddresses(data);
                $('#address-results').show();
            }
          },
          error: function(xhr, options, error) {
            console.log(error);
            $('#results').empty();
            $('.message').text('No results');
        }
    });
};

var renderAddresses = function(addresses) {
    //TODO get server to sort results
    addresses.sort(function(a,b) {
        return a.entry.street.localeCompare(b.entry.street);
    });
    $('#results').append("<option value=\"\">" + addresses.length + " addresses found</option>");
    $.each(addresses, function(index, address) {
        var template = $.templates("#address-template"),
            html = template.render({
                'address': address.entry.address,
                'property': address.entry.property,
                'street': address.entry.street,
                'town': address.entry.town,
                'postcode': address.entry.postcode
            });
        $('#results').append(html);
    });
};

$(document).ready(function(){
    $('#address-lookup').submit(addressLookup);
});
