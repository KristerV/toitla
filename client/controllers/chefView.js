Template.chefView.helpers({
	orders: function() {
		return OrderCollection.find()
	},
})

Template.chefView.rendered = function() {
	if (Meteor.user() && (!Meteor.user().profile || !Meteor.user().profile.name))
		Global.setOverlay('chefProfile', {chefId: Meteor.userId()})
}