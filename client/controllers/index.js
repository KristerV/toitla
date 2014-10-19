Template.index.helpers({
	layout: function() {
		var template
		var orderId = Session.get('orderId')
		var backgroundImage = false
		if (!!orderId) {              // Is there an order hash
			template = 'offers'
		}
		else if (!!Meteor.user()) {   // Is user chef
			template = 'orders'
		}
		else {                         // Else, new user
			template = 'createOrder'
			backgroundImage = true
		}

		Session.set('backgroundImage', backgroundImage)
		return Template[template]
	}
})