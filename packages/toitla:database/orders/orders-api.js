Orders = {
	findOne: function(id) {
		if (id)
			return OrderCollection.findOne(id);
		else
			return OrderCollection.findOne();
	},
	add: function(order, callback) {
		Meteor.call('orders.add', order, callback);
	},
	finalize: function(id, order, callback) {
		Meteor.call('orders.finalize', id, order, callback);
	},
};

