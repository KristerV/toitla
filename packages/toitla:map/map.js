MapCalculations = {
	toRad: function(a) {
		check(a, Number);
		return a * Math.PI / 180;
	},
	// finds a distance in km between two geographical points on earth
	distanceBetweenLatLon: function(location1, location2) {
		check(location1, {
			lat: Number,
			lng: Number,
			radius: Number // nod used, but can be in data
		})
		check(location2, {
			lat: Number,
			lng: Number,
		})

		var R = 6371; // earth radius in km
		var lat1 = Map.toRad(location1.lat)
		var lat2 = Map.toRad(location2.lat)
		var latDiff = Map.toRad(location2.lat-location1.lat)
		var lonDiff = Map.toRad(location2.lng-location1.lng)

		var a = Math.sin(latDiff/2) * Math.sin(latDiff/2) +
		        Math.cos(lat1) * Math.cos(lat2) *
		        Math.sin(lonDiff/2) * Math.sin(lonDiff/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		var d = R * c;

		console.log(d);
		return d;
	},
	findChefsInRange: function(location) {
		check(location, {
			lat: Number,
			lng: Number,
			radius: Number
		});

		var chefs = Chefs.getAll();

		var result = [];
		for (var i = 0, l = chefs.length; i < l; ++i) {
			var chef = chefs[i];

			if (chef.profile && chef.profile.location) {
				var chefLocation = chef.profile.location;
				if (chefLocation.geometry && chefLocation.geometry.location) {
					chefLocation = chefLocation.geometry.location;
					if (location.radius >= Map.distanceBetweenLatLon(location, {
							// I have no idea why google named these keys like this
							lat: chefLocation.k,
							lng: chefLocation.B
						})) {
						result.push(chef);
					}
				}
			}
		}

		return result;
	},
};
