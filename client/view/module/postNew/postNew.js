Template.postNew.helpers({
	description: function() {
		var post = Posts.getOne(Session.get('upload-post-id'))
		if (!post)
			return false

		return post.description
	}
})

Template.postNew.events({
	'click button.submit': function(e, tmpl) {
		var description = $('.postNew .description').val()
		var postId = Session.get('upload-post-id')
		Posts.update(postId, {$set: {description: description}})
		Posts.createNew()
		Panel.center()
	}
})

Template.postNew.rendered = function() {
	Posts.createNew()
}