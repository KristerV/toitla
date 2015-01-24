// OrderCollection = new Meteor.Collection('order');

Orders = {
	findOne: function(id) {
		return OrderCollection.findOne(id);
	}
};

