var autocomplete = null;
var map = null;
var rangeCircle = null;
var marker = null;
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
  marker.setPosition(place.geometry.location)
  marker.setVisible(true)
  drawCircle(1000)
}

//circle radius on metres
var drawCircle = function(circleRadius) {
	rangeCircle.setCenter(marker.getPosition())
	rangeCircle.setRadius(circleRadius)
	rangeCircle.setVisible(true);
}

Template.confirmOrder.rendered = function() {
 	setCurrentLocation();
  var defaultOptions = {
     center: tallinn,
     zoom: 12
   };
  map = new google.maps.Map(document.getElementById('confirmation-map'), defaultOptions);
  autocomplete = new google.maps.places.Autocomplete((document.getElementById('map-autocomplete')),{ types: ['geocode'] });
  marker = new google.maps.Marker({ map: map, visible: false })
  var circleOptions = {
	  strokeColor: '#30947f',
	  strokeOpacity: 0.2,
	  strokeWeight: 2,
	  fillColor: '#30947f',
	  fillOpacity: 0.2,
	  visible: false,
	  map: map
	}
  rangeCircle = new google.maps.Circle(circleOptions);
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
  },
  'submit form': function(e) {
  	e.preventDefault();
  },
  'change input[type="range"]' : function(e) {
  	e.preventDefault()
		var slider = $(e.currentTarget)
		drawCircle(parseInt(slider.val())*1000)
  }
})
