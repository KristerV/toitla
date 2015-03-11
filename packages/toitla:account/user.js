User = {
	getProfile: function(id) {
		console.log(id)
		var user = Meteor.users.findOne(id)
		console.log(user)
		if (!user)
			return null
		console.log(user.profile)
		return user.profile
	}
}