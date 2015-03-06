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
	getFeed: function() {
		return PostsCollection.find({imageId: {$exists: 1}, description: {$exists: 1}})
	},
	getOne: function(id) {
		return PostsCollection.findOne(id)
	},
}