Template.chefProfile.helpers({
	chef: function() {
		var chef = Meteor.users.findOne(Session.get("overlayOptions").chefId)

		if (_.isUndefined(chef) || _.isUndefined(chef.profile))
			return {}
		else
			return chef.profile
	},
	email: function() {
		var chef = Meteor.users.findOne(Session.get("overlayOptions").chefId)

		if (_.isUndefined(chef) || _.isUndefined(chef.emails) || _.isUndefined(chef.emails[0]) || _.isUndefined(chef.emails[0].address))
			return ''
		else
			return chef.emails[0].address
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
var locationResult = false

var lastAddressQuery = '';
var setLocationByAddress = function(address) {
	if (lastAddressQuery === address)
		return

	geocoder.geocode({'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (marker) {
				marker.setMap(null)
			}

			locationResult = results[0];
			map.setCenter(locationResult.geometry.location);
			map.setZoom(14);
			marker = new google.maps.Marker({
				map: map,
				position: locationResult.geometry.location
			});
		} else {
			console.log("Geocode was not successful for the following reason: " + status);
		}
	});
}
var updateMap = function() {
	// when map is not initialized somewhy
	if (!map)
		return

	var values = Global.getFormValues('chefProfile')


	// find the location by city&street
    var address = values.city;
    if (values.street) {
    	var street = values.street;
    	if (values.house) {
    		street += ' ' + values.house;
    	}
    	address = street + ', ' + address;
    }
    setLocationByAddress(address);

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

	$(function() {

		var tallinn = new google.maps.LatLng(59.437222, 24.745278);

		var mapOptions = {
			center: tallinn,
			zoom: 10
	    };
	    map = new google.maps.Map($('#profile-map')[0], mapOptions);

	    geocoder = new google.maps.Geocoder();
		updateMap();
	})
	// update map, when dom is ready,
	// and wait a bit before you do (let meteor load content)..
	//$(function() {setTimeout(updateMap, 1000)})	
}


var searchKeyTimeout = false
Template.chefProfile.events({
	'blur input[name="street"],input[name="city"],input[name="house"]': function(e, tmpl) {
		updateMap()
	},
	'keyup input[name="street"],input[name="city"],input[name="house"]' : function(e, tmpl) {
		if (searchKeyTimeout)
			clearTimeout(searchKeyTimeout)

		searchKeyTimeout = setTimeout(updateMap, 1000)
	},
	'submit form[name="chefProfile"]': function(e, tmpl) {
		e.preventDefault()
		var values = Global.getFormValues('chefProfile')

		console.log(locationResult);

		if (!locationResult) {
			// TODO tell user that we were not able to find its given location
			return
		}
		values.location = locationResult;

		var user = Meteor.user()
		var oldEmail = user.emails && user.emails[0] ? user.emails[0].address : '';

		if (oldEmail != values.email) {
			Meteor.call('changeEmail', Meteor.userId(), values.email)
		}
		Meteor.users.update(Meteor.userId(), {$set: {
			profile: values
		}})
		Global.closeOverlay()
	}
})