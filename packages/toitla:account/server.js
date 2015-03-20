Accounts.onCreateUser(function(options, user) {
	console.log(options)
	console.log(user)

	// Attempting to create user with password
	if (user.services.hasOwnProperty('password')) {

		// Is there an account with email already?
		var existingUser = !!User.findUserByEmail(options.email)
		if (existingUser)
			throw new Meteor.Error(403, T("login_emailExists"))

	}

	// Attempting to create user with facebook
	else if (user.services.hasOwnProperty('facebook')) {

		// Is there an account with email already?
		var email = user.services.facebook.email
		var existingUser = User.findUserByEmail(email)

		if (existingUser) {

			user = Facebook.mergePassIntoFace(existingUser, user)

		} else {

			// Get facebook profile picture URL
			if (!user.profile)
				user.profile = {}
			if (!user.profile.picture)
				user.profile.picture = Facebook.getAvatarLinkFromUser(user)
		}

	} else {
		// unknown service
		return false
	}


	return user
})

Accounts.validateLoginAttempt(function(attempt) {
	if (attempt.type == 'password') {

		// User exists already
		if (attempt.allowed)
			return true
		else {

			// Does email exist with facebook service?
			var args = attempt.methodArguments[0]
			var email = args.user ? args.user.email : args.email
			var usersWithEmail = User.findUserByEmail(email)
			
			if (usersWithEmail && (!usersWithEmail.services || !usersWithEmail.services.password))
				throw new Meteor.Error(T("error_nopassword").toString())
		}

	} else if (attempt.type == 'facebook' && attempt.allowed) {
		return true
	}
})
/*
{ type: 'password',
  allowed: false,
  methodName: 'login',
  methodArguments: [ { user: [Object], password: [Object] } ],
  error: 
   { [Error: User not found [403]]
     error: 403,
     reason: 'User not found',
     details: undefined,
     message: 'User not found [403]',
     errorType: 'Meteor.Error' },
  connection: 
   { id: '879Nwam5g9FE3cjHf',
     close: [Function],
     onClose: [Function],
     clientAddress: '127.0.0.1',
     httpHeaders: 
      { 'x-forwarded-for': '127.0.0.1',
        host: 'localhost:3000',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.89 Safari/537.36',
        'accept-language': 'en-US,en;q=0.8,et;q=0.6' } } }*/