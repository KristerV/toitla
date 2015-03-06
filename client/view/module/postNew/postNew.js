Template.postNew.helpers({
	image: function() {
		var post = Posts.getOne(Session.get('upload-post-id'))
		if (!post)
			return false

		var img = Images.getOne(post.imageId)
		if (!img)
			return false

		return img
	},
	description: function() {
		var post = PostsCollection.findOne(Session.get('upload-post-id'))
		if (!post)
			return false

		return post.description
	}
})

Template.postNew.events({
	'change #fileselect': function(e, tmpl) {
		FS.Utility.eachFile(e, function(file) {
			ImagesCollection.insert(file, function (err, fileObj) {
				PostsCollection.update(Session.get('upload-post-id'), 
					{$set: {imageId: fileObj._id}})
			});
		});
	},
	'click button.submit': function(e, tmpl) {
		var description = $('.postNew .description').val()
		var postId = Session.get('upload-post-id')
		PostsCollection.update(postId, {$set: {description: description}})
		Posts.createNew()
	}
})

Template.postNew.rendered = function() {
	Posts.createNew()
}