ImagesCollection.allow({
	insert: function(userId, doc) {
		return true
	},
	update: function(userId, doc, fieldNames, modifier) {

		// Is user post author?
		var imageId = doc._id
		var post = Posts.getOne({imageId: imageId})
		var isPostAuthor = !!post && userId == post.author

		// anyone can change chunkSize, because before post is saved, there is no author
		var changingChunks = _.contains(fieldNames, 'chunkSize') 

		// return
		return !!userId && (changingChunks || isPostAuthor)
	},
	remove: function(userId, doc) {
		return false
	},
	download: function() {
		return true
	}
})