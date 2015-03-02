Template.menuItem.helpers({
	height: function(){
		return Session.get('menubar-width')
	}
})

Template.menuItem.events({
	'click .menuItem': function(e, tmpl) {
		e.stopPropagation()
	}
})