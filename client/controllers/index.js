Template.index.helpers({
	layout: function() {
		var template
		var orderId = Session.get('orderId')
		
		if (!!orderId)               // Is there an order hash
			template = 'offers'
		else if (!!Meteor.user())    // Is user chef
			template = 'orders'
		else                         // Else, new user
			template = 'createOrder'

		console.log(template)
		return Template[template]
	}
})