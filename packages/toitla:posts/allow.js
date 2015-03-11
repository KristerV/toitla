PostsCollection.allow({
	insert: function (userId, doc) {
		return !!userId
	},
	update: function (userId, doc, fields, modifier) {
		return !!userId && userId == doc.author
	},
	remove: function (userId, doc) {
		return false
	},
});