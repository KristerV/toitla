ImagesCollection.allow({
	insert: function(userId, doc) {
		return true
	},
	update: function(userId, document, fieldNames, modifier) {
		return true
	},
	download: function() {
		return true
	}
})

PostsCollection.allow({
	insert: function (userId, doc) {
		return true
	},
	update: function (userId, doc, fields, modifier) {
		return true
	},
	remove: function (userId, doc) {
		return true
	},
	fetch: ['owner']
});
