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
			if (e) console.log(e)

			Global.closeOverlay()
		})
	}
})