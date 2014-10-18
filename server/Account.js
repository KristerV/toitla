var validateEmail = function(email) { 
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
} 
Accounts.validateNewUser(function(user) {
	if (!user.emails || !user.emails[0] || !validateEmail(user.emails[0])) {
		 throw new Meteor.Error(403, "email not valid");
	}
	return true
})