Template.post.helpers({
	image: function() {
		var image = Images.getOne(this.imageId)
		if (image && image.isUploaded())
			return "background-image:url("+image.url({store: '500'})+")"
		else
			return "display:none"
	},
	author: function() {
		return User.getProfile(this.author)
	}
})