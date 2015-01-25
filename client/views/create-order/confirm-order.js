Meteor.startup(function() {
	GoogleMaps.load({
		key : 'AIzaSyBTF7DCswQz8sZn8WvDnPmFVwz7rjFeQQk',
		libraries : 'places'
	});
});

Template.confirmOrder.helpers({
	mapOptions : function() {
		if (GoogleMaps.loaded()) {
			// We can use the `ready` callback to interact with the map API once
			// the map is ready.
			GoogleMaps.ready('order-map', function(map) {
				// Add a marker to the map once it's ready
				var marker = new google.maps.Marker({
					position : map.options.center,
					map : map.instance
				});
			});
			
			var tallinn = new google.maps.LatLng(59.437222, 24.745278);
			// Map initialization options
			return {
				center : tallinn,
				zoom : 12
			};
		}
	}
});

Template.confirmOrder.events({
	'submit form' : function(e, template) {
		e.preventDefault();
		var fields = ClientHelper.getFormValues(e.target);
	}
});


Template.confirmOrder.rendered = function() {

	
	GoogleMaps.ready('order-map', function(map) {
		
		//map.
		/*
		// Attach autocomplete API to input
		var input = document.getElementById('autocomplete')
		var autocomplete = new google.maps.places.Autocomplete(input)
		// Listen for changes
		google.maps.event.addListener(autocomplete, 'place_changed',
			function() {
				// Update location
				var place = autocomplete.getPlace()
				var latlng = new google.maps.LatLng(
						place.geometry.location.k,
						place.geometry.location.D)
				GoogleMaps.maps.exampleMap.instance.panTo(latlng)
			}
		);*/
	})
};