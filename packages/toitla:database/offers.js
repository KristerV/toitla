OfferCollection = new Meteor.Collection('offer');

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

// Methods for server only
if (Meteor.isServer) {
	Meteor.publish('offer', function() {
		return OfferCollection.find();
	});
	Offers.onlyForServer = function() {
		return OfferCollection.find();
	};
}
else if (Meteor.isClient){
	Meteor.subscribe('offer');
}

