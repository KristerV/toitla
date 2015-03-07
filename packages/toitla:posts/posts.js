Posts = {
	createNew: function() {
		var postId = PostsCollection.insert({
			author: Meteor.userId()
		})
		$('.postNew .description').val('')
		Session.set('upload-post-id', postId)
	},
	getAll: function() {
		return PostsCollection.find()
	},
	fetchAll: function() {
		return PostsCollection.find().fetch()
	},
	getFeed: function() {
		return PostsCollection.find({imageId: {$exists: 1}, description: {$exists: 1}})
	},
	getOne: function(id) {
		return PostsCollection.findOne(id)
	},
	clearEmpty: function() {
		var posts = Posts.fetchAll()
		_.each(posts, function(post){
			if (!post.imageId || !post.description) // TODO don't delete editing
				PostsCollection.remove(post._id)
		})
	}
}