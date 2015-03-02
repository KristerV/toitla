Template.mainMenu.rendered = function() {
	Client.getMenubarWidth()
}

Template.mainMenu.events({
	'click .menu': function(e, tmpl) {
		Scroller.goToPanel(1)
	}
})

Template.sideMenu.events({
	'click .menu': function(e, tmpl) {
		Scroller.goToPanel(1)
	}
})