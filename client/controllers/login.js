Template.login.helpers({
	isPopupOpen : function() {
		return Session.get("loginOverlay")
	}
})

Template.login.events({
	'click #login' : function(e, tmpl) {
		Global.setOverlay('loginForm')
	},
	'click #register' : function(e, tmpl) {
		Global.setOverlay('registerForm')
	}
})
