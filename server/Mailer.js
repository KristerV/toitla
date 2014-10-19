Mailer = {
	send: function (to, from, subject, text) {
		if (_.isUndefined(to) || _.isUndefined(subject) || _.isUndefined(text))
			return false

		var from = !_.isUndefined(from) ? from : 'info@domeen.com'
		check([to, from, subject, text], [String]);

		console.log("sending email '" + subject + "' to " + to)
		console.log(text)

		// TODO send emails!
		/*
		Email.send({
			to: to,
			from: from,
			subject: subject,
			text: text
		});*/
	},
}

Meteor.methods({
	orderLink: function(to, orderId) {
		var subject = T("Here is you order link")
		var text = T("Just in case you forgot :)")

		Mailer.send(to, '', subject, text)
	},
	mailNewOrder: function(chefId, orderId) {

		check(orderId, String)
		
		check(chefId, String)

		var order = OrderCollection.findOne(orderId)
		var chef = Meteor.users.findOne(chefId)

		if (!order || !chef) {
			console.log("No order or chef provided: ", order, chef)
			return
		}

		var email = chef.emails[0].address
		var desc = order.info.description
		// TODO replace localhost
		var link = 'please visit: ' + Configuration.site_address + '/chef/' + chef._id

		var subject = T('New order: ') + desc
		var text = T('A new order has arrived, check it out:\n\n')
			+ desc + '\n\n'
			+ link

		Mailer.send(email, Configuration.email, subject, text)
	},
	offerConfirmed: function(to, orderId) {
		var subject = T('One of your offers has been confirmed')
		var text = T('YOU MUST COOK, NOW!')

		Mailer.send(to, '', subject, text)
	},
});