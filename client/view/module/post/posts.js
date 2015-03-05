Posts = {
	createNew: function() {
		var postId = PostsCollection.insert({
			author: Meteor.userId()
		})
		$('.postNew .description').val('')
		Session.set('upload-post-id', postId)
	}
}