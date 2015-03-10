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