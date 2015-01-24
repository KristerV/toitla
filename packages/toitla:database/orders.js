OrderCollection = new Meteor.Collection('order');

Orders = {
	findOne: function(id) {
		if (id)
			return OrderCollection.findOne(id);
		else
			return OrderCollection.findOne();
	}
};

