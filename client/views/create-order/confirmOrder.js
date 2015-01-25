Meteor.startup(function() {
	GoogleMaps.load({
		key : 'AIzaSyBTF7DCswQz8sZn8WvDnPmFVwz7rjFeQQk',
		libraries : 'places'
	});
});

// tallinn
var marker = null;
var rangeCircle = null;
var map = null;

Template.confirmOrder.helpers({
	confirmOrder : function() {
		var order = Session.get('confirmOrder');
		if (!order) {
			return { range: 3 };
		}
		return order;
	},
	mapOptions : function() {
		if (GoogleMaps.loaded()) {			
			var tallinn = new google.maps.LatLng(59.437222, 24.745278);
			
			GoogleMaps.ready('order-map', function(m) {
				map = m.instance;
				
				
				marker = new google.maps.Marker({ map: map, visible: false });
				var circleOptions = {
					strokeColor : '#30947f',
					strokeOpacity : 0.2,
					strokeWeight : 2,
					fillColor : '#30947f',
					fillOpacity : 0.2,
					visible : false,
					map : map
				};
				rangeCircle = new google.maps.Circle(circleOptions);
				setMarker(tallinn.lat(), tallinn.lng());
				

				var autocomplete = new google.maps.places.Autocomplete((document.getElementById('map-autocomplete')), {
					types : [ 'geocode' ],
				});
				google.maps.event.addListener(autocomplete, 'place_changed',
					function() {
						var place = autocomplete.getPlace();
						if (place.geometry && place.geometry.location) {
							var location = place.geometry.location;
							setMarker(location.lat(), location.lng());
						}
					}
				);
			});
			
			// Map initialization options
			return {
				center : new google.maps.LatLng(tallinn.lat(), tallinn.lng()),
				zoom : 12
			};
		}
	}
});

Template.confirmOrder.events({
	'submit form' : function(e, template) {
		e.preventDefault();
		var fields = ClientHelper.getFormValues(e.target);
		Session.set('confirmOrder', fields);
		
		var order = Session.get('order');
		if (orderOkay(order)) {
			
			order.deadline = order.date + ' ' + order.time;
			delete order.date;
			delete order.time;
			
			order.location = {
				lat: marker.getPosition().lat(),
				lng: marker.getPosition().lng()
			};
			if (!fields.address) {
				showError('Address not set');
				return;
			}
			if (!fields.email) {
				showError('Email not set');
				return;
			}
			order.address = fields.address;
			order.radius = getRangeValue();
			order.email = fields.email;
			
			var orderId = Session.get('orderId');
			
			Orders.confirm(orderId, order, function(err) {
				if (err) {
					showError(err);
				}
				else {
					
				}
			});
		}
		else {
			showError('Order has data missing');
			setTimeout(function()  {
				Router.go('index');
			}, 2000);
		}
	},
	'change input#range' : function(e) {
		e.preventDefault();
		drawCircle();
	}
});

var errorTimeout = false;
var showError = function(error) {
	if (errorTimeout) {
		clearTimeout(errorTimeout);
		errorTimeout = false;
	}
	var e = $('.error');
	e.text(error);
	e.slideDown();
	errorTimeout = setTimeout(function() {
		e.slideUp();
	}, 5000);
};

// Check that order has all fields filled
var orderOkay = function(order) {
	if (!order)
		return false;
	if (!order.date)
		return false;
	if (!order.time)
		return false;
	if (!order.description)
		return false;	
	return true;
};

var getRangeValue = function() {
	try {
		var slider = $('#range');
		var val = parseInt(slider.val());
		if (!val)
			return 3;
		return val;
	}
	catch (e) {
		return 3;
	}
}

var setMarker = function(lat, lng) {
	var loc = new google.maps.LatLng(lat, lng);
	map.setCenter(loc);
	marker.setPosition(loc);
	marker.setVisible(true);
	drawCircle();
};

//circleRadius in km
var drawCircle = function() {
	/*
	Meteor.call('countChefsInRange', currentLocation, function(err, chefCount) {
		$('#chef-count').text(chefCount);
	})
	*/

	var circleRadius = getRangeValue();
	
	if (circleRadius < 2) {
		map.setZoom(14)
	}
	else if (circleRadius < 3) {
		map.setZoom(13);
	}
	else if (circleRadius < 5) {
		map.setZoom(12);
	}
	else if (circleRadius < 8) {
		map.setZoom(11);
	}
	else {
		map.setZoom(10);
	}

	rangeCircle.setCenter(marker.getPosition())
	rangeCircle.setRadius(circleRadius * 1000)
	rangeCircle.setVisible(true);
};

