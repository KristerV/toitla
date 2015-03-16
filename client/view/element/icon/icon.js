Template.icon.events({
	'click .btn-like': function(e) {
		// If the main feed is not transparent
		if ($(e.target).parents('.content-bar.transparent').length == 0) {
			e.stopPropagation()
			var postId = $(e.delegateTarget).parents('.post').attr('id')
			Posts.like(postId, Meteor.userId())
		}
	},
	'click .btn-share': function(e) {
		// If the main feed is not transparent
		if ($(e.target).parents('.content-bar.transparent').length == 0) {
			e.stopPropagation()
			var postId = $(e.delegateTarget).parents('.post').attr('id')
			Facebook.share(postId)
		}
	},
})