
Template.navbar.helpers({
	currentUser : function() {
		return Meteor.user()
	}
})

Template.navbar.events({
	'click #register' : function(e, tmpl) {
		Global.setOverlay('registerForm')
	},
	'click #myprofile' : function(e, tmpl) {
		Global.setOverlay('chefProfile', {chefId: Meteor.userId()})
	},
})