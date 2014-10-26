Template.chefProfile.helpers({
	chef: function() {
		var chef = Meteor.users.findOne(Session.get("overlayOptions").chefId)

		if (_.isUndefined(chef) || _.isUndefined(chef.profile))
			return {}
		else
			return chef.profile
	},
	isOwner: function() {
		var chefId = Session.get("overlayOptions").chefId
		var userId = Meteor.userId()

		if (_.isUndefined(chefId) || _.isUndefined(userId))
			return false

		return chefId == userId
	}
})

Template.chefProfile.events({
	'submit form[name="chefProfile"]': function(e, tmpl) {
		e.preventDefault()
		var values = Global.getFormValues('chefProfile')
		Meteor.users.update(Meteor.userId(), {$set: {profile: values}})
		Global.closeOverlay()
	}
})