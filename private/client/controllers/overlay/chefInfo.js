Template.chefInfo.helpers({
	chef: function() {
		return Meteor.users.findOne(Session.get("overlayOptions").chefId)
	}
})