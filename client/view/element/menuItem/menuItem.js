Template.menuItem.helpers({
	height: function(){
		return Session.get('menubar-width')
	},
})

Template.menuItem.events({
	'touchstart .menuItem, click .menuItem': function(e, tmpl) {
		e.stopPropagation()

		var panel = this.panel
		var content = this.content
		if (!panel || !content)
			throw new Meteor.Error('menuItem doesn\'t have the necessary arguments. Check sideMenu.jade or mainMenu.jade.')

		Panel.go(panel, content)
		
	}
})