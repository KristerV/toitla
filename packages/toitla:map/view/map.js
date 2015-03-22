Meteor.startup(function() {
	GoogleMaps.load({
		key : 'AIzaSyBTF7DCswQz8sZn8WvDnPmFVwz7rjFeQQk',
		libraries : 'places'
	});
});

var marker = null;
var map = null;

var setMarker = function(lat, lng) {
	var loc = new google.maps.LatLng(lat, lng);
	map.setCenter(loc);
	map.setZoom(14);
	marker.setPosition(loc);
	marker.setVisible(true);
};

var isAutocompleteShown = function(type) {
	return _.contains(['edit-user-location'], type);
};

var placeChangedFunction = function(type) {
	switch (type) {
	case 'edit-user-location':
		return function() {
			var place = this.getPlace();
			if (place.geometry && place.geometry.location) {
				var location = place.geometry.location;
				setMarker(location.lat(), location.lng());
				User.updateCurrentUserLocation({
					lat: location.lat(),
					lng: location.lng(),
					address: place.formatted_address
				});
			}
		};
	}
	return function() {console.error('placeChanged unimplemented for type ' + type)};
};

Template.map.helpers({
	autocompleteShown: function() {
		return isAutocompleteShown(this.type);
	},
	mapOptions: function() {
		if (GoogleMaps.loaded()) {
			var tallinn = new google.maps.LatLng(59.437222, 24.745278);
			
			var initialCenter = tallinn;
			var initialAddress = '';
			
			var user = Meteor.user();
			if (user.profile && user.profile.location) {
				initialCenter = new google.maps.LatLng(user.profile.location.lat, user.profile.location.lng);
				initialAddress = user.profile.location.address;
			}
			
			
			GoogleMaps.ready(this.name, function(m) {
				map = m.instance;
				
				marker = new google.maps.Marker({ map: map, visible: false });
				
				if (isAutocompleteShown(this.type)) {
					if (initialAddress) {
						$('.map-autocomplete').val(initialAddress);
						marker.setPosition(initialCenter);
						marker.setVisible(true);
					}
					var autocomplete = new google.maps.places.Autocomplete($('.map-autocomplete')[0], {
						types : [ 'geocode' ],
					});
					
					var changeFunction = placeChangedFunction(this.type);
					
					// fixing selection when enter is pressed
					$('.map-autocomplete').on('keypress', function(e) {
						if (e.which == 13) {
							setTimeout(function() {
								var firstResult = $('.pac-item-selected');
								if (!firstResult.length) {
									firstResult = $('.pac-item:first');
								}
								firstResult = firstResult.children();
								if (firstResult.length < 3) {
									return;
								}
								
								var placeName = firstResult[1].textContent;
								var placeAddress = firstResult[2].textContent;
								var address = placeName + ', ' + placeAddress;
								$(this).val(address);
								var geocoder = new google.maps.Geocoder();
								geocoder.geocode({'address' : address}, function(results, status) {
									if (status == google.maps.GeocoderStatus.OK) {
										changeFunction.bind({
											getPlace : function() {return results[0];}
										})();
									}
								});
							}.bind(this), 200);
						}
					});
					google.maps.event.addListener(autocomplete, 'place_changed', changeFunction);
				}				
			}.bind(this));
			
			// Map initialization options
			return {
				center : initialCenter,
				zoom : 12
			};
		}
	}
});

Template.map.events({
	'submit form' : function(e, template) {
		e.preventDefault();
		var fields = ClientHelper.getFormValues(e.target);
		
		if (orderOkay(order)) {
			
			order.deadline = order.date + ' ' + order.time;
			delete order.date;
			delete order.time;
			
			order.location = {
				lat: marker.getPosition().lat(),
				lng: marker.getPosition().lng()
			};
			if (!fields.address) {
				Client.error('input[name="address"]', 'Address not set');
				return;
			}
			order.address = fields.address;
			order.radius = getRangeValue();
			
		}
	}
});

