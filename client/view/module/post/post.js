Template.post.helpers({
	image: function() {
		var image = Images.getOne(this.imageId)
		if (image && image.isUploaded()) {
			var url = Images.getUrl(this.imageId, '500')
			return "background-image:url("+url+")"
		}
		else
			return "display:none"
	},
	author: function() {
		return User.getProfile(this.author)
	},
	thumbSize: function() {
		var size = Session.get('menubar-width')
		size = parseInt(size) * 0.6
		return size + 'px'
	}
})