Template.userProfileView.helpers({
	profile: function() {
		var postId = Session.get('panel-right-post')
		var post = Posts.getOne(postId)
		return User.getProfile(post.author)
	},
})