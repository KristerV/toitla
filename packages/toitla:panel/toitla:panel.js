Panel = {
	left: function(content) {
		if (content)
			Session.set('panel-left', content)
		Session.set('panel-right', null)
		
		Scroller.goToPanel(0)
	},
	center: function(content) {
		console.log("panel-center")
		if (content) {
			Session.set('panel-center', content)
		}

		Session.set('panel-left', null)
		Session.set('panel-right', null)
		Scroller.goToPanel(1)
		Router.go('/')
	},
	right: function(content, postId) {
		console.log("panel-right")
		if (content)
			Session.set('panel-right', content)
		if (postId)
			Session.set('panel-right-post', postId)
		Session.set('panel-left', null)

		if (content)
			Scroller.goToPanel(2)
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