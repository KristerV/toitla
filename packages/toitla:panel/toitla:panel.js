Panel = {
	left: function(content, options) {
		if (content)
			Session.set('panel-left', content)
		Session.set('panel-right', null)
		
		Scroller.goToPanel(0, options)
	},
	center: function(content, options) {
		if (content) {
			Session.set('panel-center', content)
		}

		Session.set('panel-left', null)
		Session.set('panel-right', null)
		Session.set('panel-right-post', null)
		Scroller.goToPanel(1, options)
		Router.go('/')
	},
	right: function(content, options) {
		if (content)
			Session.set('panel-right', content)
		if (options && options.postId)
			Session.set('panel-right-post', options.postId)
		Session.set('panel-left', null)

		// If no content, just set postId to Session
		if (content) {
			Scroller.goToPanel(2, options)
		}
	},
	go: function(panel, content) {
		if (panel == 'left')
			this.left(content)
		else if (panel == 'center')
			this.center(content)
		else if (panel == 'right')
			this.right(content)
	}
}