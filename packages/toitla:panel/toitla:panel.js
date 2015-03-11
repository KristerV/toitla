Panel = {
	left: function(content) {
		if (content) {
			Session.set('panel-left', content)
		}
		
		Scroller.goToPanel(0)
	},
	center: function(content) {
		if (content) {
			Session.set('panel-center', content)
		}

		Session.set('panel-left', null)
		Session.set('panel-right', null)
		Scroller.goToPanel(1)
	},
	right: function(content) {
		if (content) {
			Session.set('panel-right', content)
		}

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