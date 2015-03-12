Router.configure({
	layoutTemplate: 'layout',
})

Router.route('/post/:_id', function() {
	Session.set('panel-right-post', this.params._id)
	this.render()
})