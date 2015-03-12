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
	},
	like: function() {
		if (!this.likes)
			return false

		return _.contains(this.likes, Meteor.userId())
	},
	likesCount: function() {
		if (!this.likes)
			return ""
		var count = this.likes.length

		if (count == 0)
			return ""
		else if (count == 1)
			return "1 like"
		else
			return count + " likes"
	}
})

Template.post.events({
	'click .post': function(e) {
		var postId = $(e.currentTarget).attr('id')
		Panel.right('postDetails', postId)
	}
})