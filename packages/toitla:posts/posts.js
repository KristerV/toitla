Posts = {
	createNew: function() {
		var postId = PostsCollection.insert({
			author: Meteor.userId(),
			created: new Date(),
			likes: []
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
		return PostsCollection.find({imageId: {$exists: 1}, description: {$exists: 1}},{sort: {created: -1}})
	},
	getOne: function(id) {
		if (id)
			return PostsCollection.findOne(id)
		else
			return PostsCollection.findOne()
	},
	clearEmpty: function() {
		var posts = Posts.fetchAll()
		_.each(posts, function(post){
			if (!post.imageId || !post.description) // TODO don't delete editing
				PostsCollection.remove(post._id)
		})
	},
	update: function(find, change) {
		PostsCollection.update(find, change)
	},
	like: function(postId, userId) {
		var post = PostsCollection.findOne(postId)

		if (!post.likes) {
			PostsCollection.update(postId, {$set: {likes: [userId]}})
			return true
		}

		if (_.contains(post.likes, userId))
			PostsCollection.update(postId, {$pull: {likes: userId}})
		else
			PostsCollection.update(postId, {$push: {likes: userId}})

	}
}