Meteor.methods({
	reformatAllDates: function() {
		var orders = OrderCollection.find().fetch()
		for (var i = 0; i < orders.length; i++) {
			var orderId = orders[i]._id
			var orderDate = orders[i].info.date
			var orderTime = orders[i].info.time
			var timestamp = Functions.convertEstonianDateToTimestamp(orderDate, orderTime)
			OrderCollection.update(orderId, {$set: {'info.timestamp': timestamp}})
			var createdAt = Functions.convertEstonianDateToTimestamp(orders[i].info.createdAt)
			var updatedAt = Functions.convertEstonianDateToTimestamp(orders[i].info.updatedAt)
			OrderCollection.update(orderId, {$set: {'info.createdAt': createdAt}})
			OrderCollection.update(orderId, {$set: {'info.updatedAt': updatedAt}})
		};
	},
	newOrder : function(order) {

		check(order, {
			description: String,
			timestamp: Number,
			location: Match.Optional(String),
			email: String,
			createdAt: Number,
			updatedAt: Number
		})

		// find chefs by city
		var search = {}
		location = order.location.trim()
		if (location) {
			search['$or'] = [
				{'profile.city' : {$exists: false}},
				{'profile.city' : ''},
				{'profile.city' : {$regex : '^' + location + '$', $options : 'i'}}
			]
		}


		var chefs = Meteor.users.find(search).fetch()

		// collect chef ids
		var chefIds = []
		for (var i = chefs.length - 1; i >= 0; i--) {
			var chef = chefs[i]
			chefIds.push(chef._id)
		};

		order = {info: order}

		order['offers'] = []
		order['chefsNotified'] = chefIds


		console.log("Adding order:" + JSON.stringify(order))
		var orderId = OrderCollection.insert(order)
		console.log(orderId)

		if (chefIds.length == 0)
			return 'no-chefs-in-area'

		// notify client
		Meteor.call('orderLinkToClient', orderId)

		// notify chefs
		for (var i = chefs.length - 1; i >= 0; i--) {
			var chef = chefs[i]
			Meteor.call('mailNewOrder', chef._id, orderId)
		};


		return orderId
	}
})