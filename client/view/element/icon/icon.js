Template.icon.events({
	'click .btn-like': function(e) {
		var postId = $(e.delegateTarget).parents('.post').attr('id')
		Posts.like(postId, Meteor.userId())
	},
	'click .btn-share': function(e) {
		var postId = $(e.delegateTarget).parents('.post').attr('id')
		Facebook.share(postId)
	},
})