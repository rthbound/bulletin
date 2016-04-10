function initializeApp() {
  if (!localStorage.getItem('ftb.zip')) {
    zip = window.prompt("Please enter your zip code:", "10036");
    localStorage.setItem('ftb.zip', zip);
  }
}

$(document).ready(function() {
  $('#currentzip').html(localStorage.getItem('ftb.zip'));
});

$('#findpoll').on('click', function() {
  if !(address = localStorage.getItem('ftb.address')) {
    address = window.prompt("Please enter your address:", "");
    localStorage.setItem('ftb.address', address);
  }

  $.getJSON('https://ppapi.democrats.org/api', api_key: 'MjBhNGFhNzY5YTk5ZjkyY2JiN2I1ZjE1', address: @state.address, function(data) {
    if (data.status !== 'success') {
      alert("Sorry! We can't find a polling location for that address. :(");
    } else {
      $('#poll_name').html(data.line1);
    }
  });
});
  //, (response) =>
      //if response.status isnt 'success'
        //address =
          //address: response.homeAddress.line1
          //city: response.homeAddress.city
          //state: response.homeAddress.state
          //zip: response.homeAddress.zip 
        //@setState(notFound: true, loading: false, addressObj: address)
      //else
        //pollingLocation = overrides.place(response.pollingLocation) || response.pollingLocation

        //pollAddress = "#{pollingLocation.line1}, #{pollingLocation.city}, #{pollingLocation.state} #{pollingLocation.zip}"
        //@state.geocoder.geocode address: pollAddress, (results, status) =>
          //override = overrides.geocode(results[0].place_id)
          //if override
            //destination = new google.maps.LatLng(override)
          //else
            //destination = results[0].geometry.location

          //DirectionsService = new @state.google.maps.DirectionsService()
          //DirectionsService.route origin: @state.origin, destination: destination, travelMode: @state.google.maps.TravelMode.DRIVING, (result) => 
            //@setState(loaded: true, loading: false, directions: result, pollPlace: pollingLocation)

