Template.login.helpers({
	isForm: function(form) {
		return Session.get('login-form') == form
	},
	btnType: function(form) {
		if (Session.get('login-form') == form)
			return 'submit'
	},
	btnClass: function(form) {
		if (Session.get('login-form') != form)
			return 'btn-inactive'
	},
})

Template.login.events({
	'click .btn-register.btn-inactive': function(e) {
		Client.setLoginForm('register')
	},
	'click .btn-login.btn-inactive': function(e) {
		Client.setLoginForm('login')
	},
	'submit form[name="login"]': function(e, tmpl) {
		e.preventDefault()
		User.loginOrRegisterPassword(e)
	},
})