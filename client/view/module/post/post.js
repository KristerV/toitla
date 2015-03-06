Template.post.helpers({
	image: function() {
		var image = Images.getOne(this.imageId)
		if (image && image.isUploaded())
			return "background-image:url("+image.url()+")"
		else
			return "display:none"
	}
})