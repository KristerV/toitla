Template.chefProfile.helpers({
	chef: function() {
		var chef = Meteor.users.findOne(Session.get("overlayOptions").chefId)

		if (_.isUndefined(chef) || _.isUndefined(chef.profile))
			return {}
		else
			return chef.profile
	},
	isOwner: function() {
		var chefId = Session.get("overlayOptions").chefId
		var userId = Meteor.userId()

		if (_.isUndefined(chefId) || _.isUndefined(userId))
			return false

		return chefId == userId
	}
})


var map = false
var geocoder = false
var marker = false

var locationByAddress = function(address) {
	console.log('loc')
	geocoder.geocode({'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			if (marker) {
				marker.setMap(null)
			}
			marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location
			});
		} else {
			alert("Geocode was not successful for the following reason: " + status);
		}
	});
}
var updateMap = function() {
	// if the profile is not present, do not show the map
	if (0 == $('form[name=chefProfile]').length) {
		$('#profile-map').css('height', '0')
		return
	}
	$('#profile-map').css('height', '300')

	var values = Global.getFormValues('chefProfile')

	// if city is not set, do not show the map (nor make a query about the location)
	if (!values.city) {
		$('#profile-map').css('height', '0')
		return
	}

	// find the location by city&street
    var address = values.city;
    if (values.street) {
    	var street = values.street;
    	if (values.house) {
    		street += ' ' + values.house;
    	}
    	address = street + ', ' + address;
    }
    locationByAddress(address);

    /*
	$.get('http://nominatim.openstreetmap.org/search?format=json&limit=1&city=' +
		values.city + '&street=' + values.street + '&country=ee', function(data)
	{
		var place = data[0]

		if (!place){
			$('#chefMap').css('height', '0')
			return
		}

		if (map)
			map.destroy()
			
		map = new OpenLayers.Map('chefMap', {projection:'EPSG:3857'});

	    var osm = new OpenLayers.Layer.OSM(); // openstreetmap
	    var toMercator = OpenLayers.Projection.transforms['EPSG:4326']['EPSG:3857'];

	    var feature = new OpenLayers.Feature.Vector(
	        toMercator(new OpenLayers.Geometry.Point(place.lon, place.lat)),
	        {loc : place.display_name},
	        {
	            fillColor : '#008040',
	            fillOpacity : 0.8,                    
	            strokeColor : '#ee9900',
	            strokeOpacity : 1,
	            strokeWidth : 1,
	            pointRadius : 8
	        }
        )
	        
	    // vectorlayer for programmatic graphics
	    var vector = new OpenLayers.Layer.Vector('Points')
	    vector.addFeatures([feature])
	    map.addLayers([osm, vector])
	    // set center position and zoom
	    map.setCenter(new OpenLayers.LonLat(place.lon, place.lat).transform('EPSG:4326', 'EPSG:3857'), 12)
	})
	*/
}

Template.chefProfile.rendered = function() {


	setTimeout(function() {

		new google.maps.LatLng(37.7699298, -122.4469157);

		var mapOptions = {
	      center: { lat: -34.397, lng: 150.644},
	      zoom: 8
	    };
	    map = new google.maps.Map(document.getElementById('profile-map'), mapOptions);

	    geocoder = new google.maps.Geocoder();
		
	}, 2000)
	// update map, when dom is ready,
	// and wait a bit before you do (let meteor load content)..
	//$(function() {setTimeout(updateMap, 1000)})	
}

Template.chefProfile.events({
	'blur input[name="street"]': function(e, tmpl) {
		updateMap()
	},
	'submit form[name="chefProfile"]': function(e, tmpl) {
		e.preventDefault()
		var values = Global.getFormValues('chefProfile')
		Meteor.users.update(Meteor.userId(), {$set: {profile: values}})
		Global.closeOverlay()

		$.get('http://nominatim.openstreetmap.org/search?format=json&limit=1&city=' +
			values.city + '&street=' + values.street + '&country=ee', function(data)
		{
			var place = data[0];
			if (place) {
				Meteor.users.update(Meteor.userId(), {$set: {'profile.location': place}})
			}
		})
	}
})