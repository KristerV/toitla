Template.mainMenu.rendered = function() {
	Client.getMenubarWidth()
}

Template.mainMenu.helpers({
	menubarWidth: function(){
		return Session.get('menubar-width')
	},
	profileImage: function() {
		return Meteor.user().profile.picture
	}
})


Template.sideMenu.helpers({
	menubarWidth: function(){
		return Session.get('menubar-width')
	}
})

Template.mainMenu.events({
	'click .menu': function(e, tmpl) {
		Panel.center()
	}
})

Template.sideMenu.events({
	'click .menu': function(e, tmpl) {
		Panel.center()
	}
})