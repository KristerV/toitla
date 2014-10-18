Template.login.helpers({
	isPopupOpen : function() {
		return Session.get("loginOverlay")
	},
	hasBackgroundImage : function(){
		return Session.get("backgroundImage") ? 'light-text' : '' 
	} 
})

Template.login.events({
	'click #login' : function(e, tmpl) {
		Global.setOverlay('loginForm')
	},
	'click #register' : function(e, tmpl) {
		Global.setOverlay('registerForm')
	},
	'click #logout' : function(e, tmpl) {
		Meteor.logout()
	},
	'click #myprofile' : function(e, tmpl) {
		Global.setOverlay('chefProfile', {chefId: Meteor.userId()})
	},
})
