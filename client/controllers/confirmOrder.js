var autocomplete = null;
var map = null;
var rangeCircle = null;
var marker = null;
var tallinn = new google.maps.LatLng(59.437222, 24.745278);
var currentLocation = {lat: tallinn.lat(), lng: tallinn.lng(), radius: 3};

var setCurrentLocation = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $(function() {
        currentLocation.lat = position.coords.latitude
        currentLocation.lng = position.coords.longitude
        map.setCenter(currentLocation)
        drawCircle()
      })
    })
  } 
}
var setMarker = function(place) {
  map.setCenter(place.geometry.location)
  map.setZoom(14)
  marker.setPosition(place.geometry.location)
  marker.setVisible(true)
  // google uses these keys: B and k - don't know why
  currentLocation.lat = place.geometry.location.k;
  currentLocation.lng = place.geometry.location.B;
  currentLocation.radius = getRangeValue()
  drawCircle()
}

var getRangeValue = function() {
	slider = $('.circle-range')
	return parseInt(slider.val())
}

//circleRadius in km
var drawCircle = function() {
  console.log(currentLocation)
  Meteor.call('countChefsInRange', currentLocation, function(err, chefCount) {
    console.log(chefCount)
    $('#chef-count').text(chefCount);
  })

  circleRadius = currentLocation.radius;

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
    setCurrentLocation();
  },
  'submit form': function(e) {
  	e.preventDefault();


  },
  'change input[type="range"]' : function(e) {
  	e.preventDefault()

    currentLocation.radius = getRangeValue();
		drawCircle()
  }
})
