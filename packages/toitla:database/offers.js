
// General methods
Offers = {
	findOne: function(id) {
		return OfferCollection.findOne(id);
	},
	update: function(id, data) {
		return OfferCollection.update(id, data);
	},
	remove: function(id) {
		return OfferCollection.remove(id);
	}
};
