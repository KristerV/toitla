Meteor.methods({
	// DOES NOT WORK! kepping for future reference
	updateStores: function() {
		var posts = Posts.fetchAll()
		_.each(posts, function(post) {
			var img = Images.getOne(post.imageId)
			if (!img)
				return false
			if (img.isUploaded()) {
				img['_id'] = img['_id'] + 'upd'
				Images.insert(img, post._id)
			}
		})
	}
})