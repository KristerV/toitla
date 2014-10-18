Template.chefProfile.helpers({
	chef: function() {
		var chef = Meteor.users.findOne(Meteor.userId())
		if (_.isUndefined(chef) || _.isUndefined(chef.profile))
			return {}
		else
			return chef
	}
})