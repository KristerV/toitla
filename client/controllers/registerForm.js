Template.registerForm.events({
	'submit form[name="register"]': function(e, tmpl) {
		e.preventDefault()

		var form = $('form[name="register"]')
		var email = form.find('input[name="email"]').val()



		var user = {
			username: email,
			email: email,
			password: form.find('input[name="password"]').val()
		}

		Accounts.createUser(user, function(e) {
			if (e) {
				console.log(e);
				//if ()
			}
			else {
				// success
				Global.closeOverlay()				
			}
		})
	}
})

Accounts.validateNewUser(function(user) {
	if (!Global.validateEmail(user.email)) {
		 throw new Meteor.Error(403, T("email not valid"));
	}
	if (!user.password || user.password.length < 8) {
		 throw new Meteor.Error(403, T("password not long enough"));
	}
}) 

