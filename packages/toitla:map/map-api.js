Map = {
	createMap : function(elemId) {
		var tallinn = new google.maps.LatLng(59.437222, 24.745278);

		var mapOptions = {
			// TODO: center should be order location
			center : tallinn,
			zoom : 12
		};
		return new google.maps.Map(document.getElementById(elemId), mapOptions);
	}	
};