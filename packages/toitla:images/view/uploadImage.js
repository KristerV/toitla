Template.uploadImage.helpers({
	image: function() {
		var post = Posts.getOne(Session.get('upload-post-id'))
		if (!post)
			return false

		var img = Images.getOne(post.imageId)
		if (!img)
			return false

		return img
	},
	imageUrl: function() {
		return Images.getUrl(this._id, '500')
	},
	size: function() {
		console.log("SIZE")
		console.log(this)
	},
	hasStored: function() {
		console.log("hasSTORED")
		console.log(this)
		if (true)
			return this.hasStored('180')
		else
			return this.hasStored('500')
	}
})

Template.uploadImage.events({
	'change #fileselect': function(e, tmpl) {
		Images.addImages(e)
	},
})