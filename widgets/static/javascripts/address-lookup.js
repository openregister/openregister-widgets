// temp restriction for postcode search
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

    console.log(isValidPostcode(searchValue));

    if(isValidPostcode(searchValue)) {
        $.ajax({
              type: 'GET',
              url: 'http://address.openregister.org/search?_query='+searchValue+'&_representation=json',
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

var renderAddresses = function(addresses){
    $.each(addresses, function(index, address){
        $('.results').append('<li>'+ address.entry.property +' '+ address.entry.street + ' ' + address.entry.town + ' ' + address.entry.postcode +'</li>');
    });
};

$(document).ready(function(){
    $('#address-lookup').submit(addressLookup);
});
