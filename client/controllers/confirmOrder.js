var autocomplete = null;
var map = null;
var tallinn = new google.maps.LatLng(59.437222, 24.745278);

var setCurrentLocation = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      geolocation = { lat: position.coords.latitude, lng: position.coords.longitude }
      map.setCenter(geolocation)
    })
  } 
}
var setMarker = function(place) {
  map.setCenter(place.geometry.location)
  map.setZoom(14)
  marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  })
}

Template.confirmOrder.rendered = function() {
	$('.order-range').jRange({
	    from: 1,
	    to: 5,
	    step: 1,
	    scale: [1, 3, 5, 10, 25],
	    format: '%s',
	    showLabels: true,
	    isRange: true,
	});

 	setCurrentLocation();
  var defaultOptions = {
     center: tallinn,
     zoom: 12
   };
  map = new google.maps.Map(document.getElementById('confirmation-map'), defaultOptions);
  autocomplete = new google.maps.places.Autocomplete((document.getElementById('map-autocomplete')),{ types: ['geocode'] });
  google.maps.event.addListener(autocomplete, 'place_changed', function(param) {
    setMarker(autocomplete.getPlace());
  });	
}

Template.confirmOrder.events({
	'focus #maps-autocomplete' : function(e, tmpl) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = new google.maps.LatLng( 
            position.coords.latitude, position.coords.longitude);
        autocomplete.setBounds(new google.maps.LatLngBounds(geolocation,
            geolocation));
      });
    }
  }
})