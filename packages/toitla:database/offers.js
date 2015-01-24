OfferCollection = new Meteor.Collection('offer');
// General methods
Offers = {
	findOne: function(id) {
		if (id)
			return OfferCollection.findOne(id);
		else
			return OfferCollection.findOne();
	},
	insert: function(data) {
		return OfferCollection.insert(data);
	},
	update: function(id, data) {
		return OfferCollection.update(id, data);
	},
	remove: function(id) {
		return OfferCollection.remove(id);
	}
};
