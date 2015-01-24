OrderCollection = new Meteor.Collection('order');

Meteor.methods({
	'orders.add' : function(order) {
		check(order, {
			description: String,
			date: String,
			time: String,
		});
	
		// Convert date to timestamp
		//order['timestamp'] = Functions.convertEstonianDateToTimestamp(order.date, order.time)
		//delete order.date
		//delete order.time
		
		return OrderCollection.insert(order);		
	
	},
	'orders.finalize' : function(orderId, order) {
		check(id, String);
		check(order, {
			location: Match.Optional(String),
			email: String,
			createdAt: Number,
			updatedAt: Number
		});
		
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
		OrderCollection.update(orderId, order)
	
		if (chefIds.length == 0)
			return 'no-chefs-in-area'
	
		// notify client
		Meteor.call('orderLinkToClient', orderId)
	
		// notify chefs
		for (var i = chefs.length - 1; i >= 0; i--) {
			var chef = chefs[i]
			Meteor.call('mailNewOrder', chef._id, orderId)
		};
	}
});