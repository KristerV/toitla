Template.index.helpers({
	layout: function() {
		var template
		var orderId = Session.get('orderId')
		var backgroundImage = false
		if (!!Meteor.user()) {   // Is user chef
			template = 'orders'
		}
		else if (!!orderId) {              // Is there an order hash
			template = 'offers'
		}
		else {                         // Else, new user
			template = 'createOrder'
			backgroundImage = true
		}

		Session.set('backgroundImage', backgroundImage)
		return Template[template]
	}
})

Template.index.rendered = function() {

	if ('undefined' == typeof Configuration) {
		alert('Hey, developer! Please create /lib/configuration.js \n(there is an example also).')
	}
}