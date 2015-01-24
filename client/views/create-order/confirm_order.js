Template.confirm_order.events({
	'submit form' : function(e, template) {
		e.preventDefault();
		var fields = ClientHelper.getFormValues(e.target);
	}
});


var map = null;
Template.confirm_order.rendered = function() {
	
		
		GoogleMaps.ready('offer-map', function(map) {
			console.log(map);
		});
		/*
		
		setTimeout(function() {
			
			
			
			var tallinn = new google.maps.LatLng(59.437222, 24.745278);
			
			var mapOptions = {
					// TODO: center should be order location
					center : tallinn,
					zoom : 12
			};
			map = new google.maps.Map(document.getElementById('offer-map'), mapOptions);
		}, 1000);*/
		
	
	//map = Map.createMap('offer-map');
};