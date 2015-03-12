Template.icon.events({
	'click .icon': function(e) {
		var postId = $(e.delegateTarget).parents('.post').attr('id')
		Posts.like(postId, Meteor.userId())
	}
})