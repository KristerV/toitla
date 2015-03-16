Router.configure({
	layoutTemplate: 'layout',
})

Router.route('/', function() {
	// Panel.center()
	this.render()
})

Router.route('/post/:_id', function() {

	// User landed on page with a link, but layout not
	// done yet so can't scroll to right panel
	if (Scroller.scrollPanels.length == 0)
		Panel.right(null, {postId: this.params._id}) // set the id anyway
	else
		// User clicked on a post
		Panel.right('postDetails', {postId: this.params._id}) // set id and scroll
	this.render()
})