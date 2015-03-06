Template.post.helpers({
	imageUrl: function() {
		return Images.getUrl(this.imageId)
	}
})