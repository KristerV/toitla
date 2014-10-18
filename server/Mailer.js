Mailer = {
	send: function (to, from, subject, text) {
		if (_.isUndefined(to) || _.isUndefined(subject) || _.isUndefined(body))
			return false

		var from = !_.isUndefined(from) ? from : 'info@domeen.com'
		check([to, from, subject, text], [String]);

		// Let other method calls from the same client start running,
		// without waiting for the email sending to complete.
		this.unblock();

		Email.send({
			to: to,
			from: from,
			subject: subject,
			text: body
		});
	},
}

Meteor.methods({
	orderLink: function(to, orderId) {
		var subject = T("Here is you order link")
		var text = T("Just in case you forgot :)")

		Mailer.send(to, null, subject, text)
	},
	newOrder: function(to, orderId) {
		var subject = T('New order from') + orderId
		var text = T('A new order has arrived, check it out')

		Mailer.send(to, null, subject, text)
	},
	offerConfirmed: function(to, orderId) {
		var subject = T('One of your offers has been confirmed')
		var text = T('YOU MUST COOK, NOW!')

		Mailer.send(to, null, subject, text)
	},
});