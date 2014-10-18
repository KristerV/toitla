Meteor.methods({
	newOrder : function(order) {

		check(order, {
			description: String,
			date: String, // TODO should be Date
			time: Match.Optional(String),
			location: Match.Optional(String)
		})

		// find chefs by city
		var search = {}
		location = order.location.trim()
		if (location) {
			search['profile.city'] = {$regex : location, $options : 'i'}
		}


		var chefs = Meteor.users.find(search).fetch()
		var chefIds = []
		for (var i = chefs.length - 1; i >= 0; i--) {
			chefIds.push(chefs[i]._id)
		};

		order = {info: order}

		order['offers'] = []
		order['chefsNotified'] = chefIds


		console.log("Adding order:" + JSON.stringify(order))
		OrderCollection.insert(order)
	}
})