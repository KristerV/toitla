Accounts.onCreateUser(function(options, user) {

	// Get facebook profile picture URL
	if (options.profile) {
		options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
		user.profile = options.profile;
	}

	return user
})