// temp restriction for address search by postcode only. will remove when full address index is running
// courtesy of http://www.qodo.co.uk/blog/javascript-check-if-a-uk-postcode-is-valid/
var isValidPostcode = function(postcode) {
    var postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i;
    return postcodeRegEx.test(postcode);
}

var addressLookup = function(event) {
    var input = $("#address-lookup :input[name='search']"),
        searchValue = input.val();
    event.preventDefault();
    $('.results').empty();
    $('.message').empty();

    if(isValidPostcode(searchValue)) {
        $.ajax({
              type: 'GET',
              url: 'http://address.openregister.org/search?postcode='+searchValue+'&_representation=json',
              contentType: 'application/json',
              success: function(data) {
                renderAddresses(data);
              },
              error: function(xhr, options, error) {
                if(xhr.status == 404) {
                    console.log(error);
                    $('.results').empty();
                    $('.message').text('No results')
                }
            }
        });
    } else {
        $('.message').text(searchValue + 'is not a valid UK postcode');
    }
};

var renderAddresses = function(addresses) {
    addresses.sort(function(a,b) {
        if (a.entry.property && b.entry.property) {
            return a.entry.property.localeCompare(b.entry.property);
        } else if (a.entry.street && b.entry.street) {
            return a.entry.street.localeCompare(b.entry.street);
        }
        else {
            return 0;
        }
    });
    $.each(addresses, function(index, address) {
        var template = $.templates("#template"),
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
