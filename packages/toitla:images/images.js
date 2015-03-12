Images = {
	getOne: function(id) {
		return ImagesCollection.findOne(id)
	},
	fetchAll: function() {
		return ImagesCollection.find().fetch()
	},
	getUrl: function(id, store, full) {
		var imgObj = this.getOne(id)
		if (!imgObj)
			return null

		if (store)
			url = imgObj.url({store: store})
		else
			url = imgObj.url()
		if (!url)
			return null

		// Remove token, it for some reason creates confusion
		// Token format: image/link.png?token=xxxx
		var cleanUrl = url.split('?')[0]

		if (full)
			cleanUrl = Configuration.urlNoSlash() + cleanUrl

		return cleanUrl.replace(/ /g, '%20')
	},
	getUrlByPost: function(postId, full) {
		var post = Posts.getOne(postId)
		var imageId = post.imageId
		return this.getUrl(imageId, null, full)
	},
	updateStores: function() {
		Meteor.call('updateStores')
	},
	// Insert a new image to DB
	// file: File or url to insert
	// postId: attach image id to post
	insert: function(file, postId) {
		ImagesCollection.insert(file, function (err, fileObj) {
			if (!err) {
				Posts.update(postId, {$set: {imageId: fileObj._id}})
			} else {
				console.log("INSERT ERROR:")
				console.log(err)
			}
		})
	},
	clearEmpty: function() {
		var images = this.fetchAll()
		_.each(images, function(img){
			if (!img.isUploaded())
				ImagesCollection.remove(img._id)
		})
	},
	addImages: function(e) {
		FS.Utility.eachFile(e, function(file) {
			Images.insert(file, Session.get('upload-post-id'))
		});
	}
}

