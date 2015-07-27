var addressLookup = function(event) {
    var input = $("#address-lookup :input[name='search']"),
        searchValue = input.val().trim();
    event.preventDefault();
    $('#address-selector').hide();
    $('#addresses').empty();
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
                $('#address-selector').show();
            }
          },
          error: function(xhr, options, error) {
            console.log(error);
            $('#addresses').empty();
            $('.message').text('No results');
        }
    });
};

var renderAddresses = function(addresses) {
    //TODO get server to sort results
    addresses.sort(function(a,b) {
        return a.entry.street.localeCompare(b.entry.street);
    });
    $.each(addresses, function(index, address) {
        var template = $.templates("#address-template"),
            html = template.render({
                'address': address.entry.address,
                'property': address.entry.property,
                'street': address.entry.street,
                'town': address.entry.town,
                'postcode': address.entry.postcode
            });
        $('#addresses').append(html);
    });

    $('.block-label').click(function() {
        $('#address-list').submit();
    });
};


$(document).ready(function(){
    $('#address-lookup').submit(addressLookup);
    // $( ".js-form-select, .js-form-select label" ).click(function() {
    //     $( this ).addClass("focused selected");
    // });

});
