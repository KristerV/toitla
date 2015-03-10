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
		Images.addImages(e)
	},
	'click button.submit': function(e, tmpl) {
		var description = $('.postNew .description').val()
		var postId = Session.get('upload-post-id')
		PostsCollection.update(postId, {$set: {description: description}})
		Scroller.goToPanel(1)
		Posts.createNew()
	}
})

Template.postNew.rendered = function() {
	Posts.createNew()
}