Template.registerForm.events({
	'submit form[name="register"]': function(e, tmpl) {
		e.preventDefault()
		Global.removeErrors()

		var form = $('form[name="register"]')
		var email = form.find('input[name="email"]').val()

		var password = form.find('input[name="password"]').val();

		if (!password || password.length < 8) {
		 	Global.addError($('#password'), 'password too short')
			return
		}


		var user = {
			username: email,
			email: email,
			password: password
		}


		Accounts.createUser(user, function(e) {

			if (e) {
				var r = e.reason.toLowerCase();
				if (r.indexOf('email') != -1) {
					Global.addError($('#email'), r)
				}
				else if (r.indexOf('password') != -1) {
					Global.addError($('#password'), r)
				}
				else {
					Global.addError($('#email'), r);
				}
			}
			else {
				// success
				Session.set('showLogin', null)
				Global.closeOverlay()
			}
		})
	}
})

