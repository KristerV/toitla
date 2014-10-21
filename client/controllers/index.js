Template.index.helpers({
	layout: function() {
		var template
		var orderId = Session.get('orderId')
		var backgroundImage = false
		if (!!Meteor.user()) { // User is chef
			template = 'chefView'
		}
		else if (!!orderId) { // There is an order hash
			template = 'clientView'
		}
		else { // Anonymous new user
			template = 'createOrder'
			backgroundImage = true
		}

		Session.set('backgroundImage', backgroundImage)
		return Template[template]
	}
})

Template.index.rendered = function() {

	if ('undefined' == typeof Configuration) {
		alert('Hey, developer! \n\n Yes you, Krister!!\nPlease provide a /lib/configuration.js \n(there is an example also).')
	}
	if (Session.get('showLogin')) {
		if (Meteor.user()) {
			Session.set('showLogin', false)
		}
		else {
			Global.setOverlay('loginForm')
		}
	}
}