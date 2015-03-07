Meteor.methods({
	// DOES NOT WORK! kepping for future reference
	updateStores: function() {
		var posts = Posts.fetchAll()
		_.each(posts, function(item) {
			var img = Images.getOne(item.imageId)
			if (img.isUploaded()) {
				Images.insert(img, item._id)
			}
		})
	}
})