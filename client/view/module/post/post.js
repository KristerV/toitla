Template.post.helpers({
	image: function() {
		var image = Images.getOne(this.imageId)
		if (image && image.isUploaded() && image.hasStored())
			return "background-image:url("+image.url({store: '500'})+")"
		else
			return "display:none"
	}
})