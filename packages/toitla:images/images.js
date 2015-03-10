Images = {
	getOne: function(id) {
		return ImagesCollection.findOne(id)
	},
	fetchAll: function() {
		return ImagesCollection.find().fetch()
	},
	getUrl: function(id) {
		var imgObj = this.getOne(id)
		if (!imgObj)
			return null

		url = imgObj.url()
		if (!url)
			return null

		// Remove token, it for some reason creates confusion
		// Token format: image/link.png?token=xxxx
		var cleanUrl = url.split('?')[0]
		return cleanUrl
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
				PostsCollection.update(postId,
					{$set: {imageId: fileObj._id}})
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

