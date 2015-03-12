Template.userProfileView.helpers({
	profile: function() {
		var postId = Session.get('panel-right-post')
		var post = Posts.getOne(postId)
		if (!post)
			return false
		return User.getProfile(post.author)
	},
})