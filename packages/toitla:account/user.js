User = {
	getProfile: function(id) {
		var user = Meteor.users.findOne(id)
		if (!user)
			return null
		return user.profile
	},
	loginOrRegisterPassword: function(e) {
		// Get values
		var email = $('#email').val()
		var pass = $('#password').val()
		var pass2 = $('#password2').val()

		// Empty valuable info
		$('#password').val("")
		$('#password2').val("")

		// Perform action
		var formType = Session.get('login-form')
		if (formType == 'login') { 

			// Try to login
			Meteor.loginWithPassword({email: email}, pass, function(err) {
				if (err) {
					var reason = err.reason ? err.reason : err.error
					Client.error('.login .error-placeholder', reason)
				}
				else
					Panel.center()
			})
		}
		else if (formType == 'register') { 

			if (pass != pass2) {
				Client.error('.login .error-placeholder', T("login_pass_mismatch").toString())
				return false
			} else if (pass.length < 8) {
				Client.error('.login .error-placeholder', T("login_passTooShort").toString())
				return false
			}

			Accounts.createUser({email: email, password: pass}, function(err) {
				if (err) {
					var reason = err.reason ? err.reason : err.error
					Client.error('.login .error-placeholder', reason)
				}
				else
					Panel.left('userProfileEdit')
			})

		}
	},
	findUserByEmail: function(email) {
		return Meteor.users.findOne(
			{$or: [
				{'services.facebook.email': email}, // facebook
				{emails: {$elemMatch: {address: email}}}, // user.email
			]}
		)
	},
	updateCurrentUserLocation: function(location) {
		check(location, {
			lat: Number,
			lng: Number,
			address: String,
		});
		Meteor.users.update(Meteor.userId(), {
			$set: {'profile.location': location}
		});		
	}
};

