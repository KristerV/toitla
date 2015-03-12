Router.configure({
	layoutTemplate: 'layout',
})

Router.route('/post/:_id', function() {
	Panel.right('postDetails', this.params._id)
	this.render()
})