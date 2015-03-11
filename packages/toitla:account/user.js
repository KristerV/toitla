User = {
	getProfile: function(id) {
		var user = Meteor.users.findOne(id)
		if (!user)
			return null
		return user.profile
	}
}