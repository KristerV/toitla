Template.titlePage.helpers({
	invisible: function() {
		return Client.titlepageVisible() ? '' : 'opacity-none'
	}
})

Template.titlePage.events({
	'click .login': function() {
		Client.setLoginForm('login')
		Panel.left('login')
	},
	'click .register': function() {
		Client.setLoginForm('register')
		Panel.left('login')
	},
})