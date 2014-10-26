Template.loginForm.events({
	'submit form[name="loginForm"]': function(e, tmpl) {
		e.preventDefault()
		var values = Global.getFormValues('loginForm')
		Meteor.loginWithPassword(values.email, values.password, function(err) {
			if (!_.isUndefined(err)) {
				Global.addError($('#password'), 'Login failed')
			}
			else
				Global.closeOverlay()
		})
	}
})