Chef = {
	getChefsInArea: function(area) {
		var city = new RegExp($('input[name="location"]').val(), 'i')
		var chefs = Meteor.users.find({'profile.city': city}).fetch()
		return chefs
	},
	getChefsInAreaCount: function(area) {
		var chefs = Chef.getChefsInArea(area)
		return chefs.length
	}
}