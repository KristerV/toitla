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
	},
	thumbHeight: function() {
		return Session.get('minithumb-width')
	}
})

Template.post.events({
	'click .post': function(e) {

		// If the main feed is not transparent
		if ($(e.target).parents('.content-bar.transparent').length == 0) {
			var postId = $(e.currentTarget).attr('id')
			Router.go('/post/'+postId)
			e.stopPropagation()
		}
	}
})

Template.post.rendered = function() {
	Client.getPostThumbWidth()
}