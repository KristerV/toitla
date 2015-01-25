Template.index.helpers({
	layout: function() {
		var template
		var orderId = Session.get('orderId')
		var backgroundImage = false
		if (!!Meteor.user()) { // User is chef
			template = 'chefView'
		}
		else if (!!Session.get('view')) {
			template = Session.get('view')
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
	},
	dev_server: function() {
		return !!Configuration.development_server
	}
})

Template.index.rendered = function() {
	document.title = T('Homecooks')
	$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">')

	if ('undefined' == typeof Configuration) {
		alert('Hey, developer! \n\n Yes you!\nPlease provide a /lib/configuration.js \n(there is an example also).')
	}

	Meteor.setTimeout(function(){
		if (Session.get('showLogin')) {
			if (Meteor.user()) {
				Session.set('showLogin', null)
			}
			else {
				Global.setOverlay('loginForm')
			}
		}
	}, 500)
}