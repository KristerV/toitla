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
  drawCircle(getRangeValue())
}

var getRangeValue = function() {
	slider = $('.circle-range')
	return parseInt(slider.val())
}

//circleRadius in km
var drawCircle = function(circleRadius) {
	if (circleRadius >= 3) {
		map.setZoom(12)
	} else if (circleRadius > 1) {
		map.setZoom(13)
	} else {
		map.setZoom(14)
	}
	rangeCircle.setCenter(marker.getPosition())
	rangeCircle.setRadius(circleRadius*1000)
	rangeCircle.setVisible(true);

}

Template.confirmOrder.rendered = function() {
 	setCurrentLocation();
  var mapOptions = {
     center: tallinn,
     zoom: 12
   };
  map = new google.maps.Map(document.getElementById('confirmation-map'), mapOptions);
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
		drawCircle(getRangeValue())
  }
})
