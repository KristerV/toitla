OrderCollection.allow({
	insert: function (userId, doc) {
		return true
	},
	update: function (userId, doc, fields, modifier) {
		return true
	},
	remove: function (userId, doc) {
		return false
	},
});
OfferCollection.allow({
	insert: function (userId, doc) {
		return true
	},
	update: function (userId, doc, fields, modifier) {
		return true
	},
	remove: function (userId, doc) {
		return true
	},
});