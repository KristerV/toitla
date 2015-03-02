Template.menuItem.helpers({
	height: function(){
		return Session.get('menubar-width')
	}
})

Template.menuItem.events({
	'click .menuItem': function(e, tmpl) {
		e.stopPropagation()

		var panel = this.panel
		var content = this.content
		if (!panel || !content)
			throw new Meteor.Error('menuItem doesn\'t have the necessary arguments. Check sideMenu.jade or mainMenu.jade.')
		
		Session.set('panel-'+panel, content)

		if (panel == 'left')
			Scroller.goToPanel(0)
	}
})