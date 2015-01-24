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
	confirm: function(id, order, callback) {
		Meteor.call('orders.confirm', id, order, callback);
	},
};

