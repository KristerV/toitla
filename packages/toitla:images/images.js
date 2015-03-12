Images = {
	getOne: function(id) {
		return ImagesCollection.findOne(id)
	},
	fetchAll: function() {
		return ImagesCollection.find().fetch()
	},
	getUrl: function(id, store, full) {
		console.log("here 1")
		var imgObj = this.getOne(id)
		console.log("here 2")
		if (!imgObj) {
			console.log("here 3")
			return null
		}

		if (store) {
			console.log("here 4")
			url = imgObj.url({store: store})
		}
		else {
			console.log("here 5")
			url = imgObj.url()
		}
		if (!url) {
			console.log("here 6")
			return null
		}
		console.log("here 7")

		// Remove token, it for some reason creates confusion
		// Token format: image/link.png?token=xxxx
		var cleanUrl = url.split('?')[0]
		console.log("here 8")

		if (full) {
			console.log("here 9")
			cleanUrl = Configuration.urlNoSlash() + cleanUrl
		}
		console.log("here 10")

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

