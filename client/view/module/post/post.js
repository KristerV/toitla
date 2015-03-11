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
	thumbWidth: function() {
		return Session.get('mini-thumb-width')
	}
})

Template.post.rendered = function() {
	Client.getMinithumbWidth()
}