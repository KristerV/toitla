
Accounts.validateNewUser(function(user) {

	if (!user.emails || !user.emails[0] || !Functions.validateEmail(user.emails[0].address)) {
		 throw new Meteor.Error(403, "email not valid");
	}
	return true
})