Mailer = {
	send: function (to, from, subject, text) {
		if (_.isUndefined(to) || _.isUndefined(subject) || _.isUndefined(text))
			return false

		var from = !_.isUndefined(from) ? from : Configuration.email
		check([to, from, subject, text], [String]);

		console.log("sending email '" + subject + "' to " + to)
		console.log(text)

		if (process.env.MAILGUN_API_URL) {
			Meteor.http.post(process.env.MAILGUN_API_URL + '/' + process.env.MAILGUN_DOMAIN + '/messages', 
				{
					auth:"api:" + process.env.MAILGUN_API_KEY,
					params: 
					{
						"from": from,
						"to":[to],
						"subject": subject,
						"text": text,
					}
				},
				function(error, result) {
					if(error){
						console.log("Error: " + error)
					} else {
						console.log("Email sent")
					}
				}
			)
		} else {
			console.log("Error: Email not sent. Mailgun has not been configured.")
		}
	},
}

Meteor.methods({
	/* Client emails */
	//To: Client
	//When clients has placed and order
	orderLinkToClient: function(orderId) {
		check(orderId, String)
		var order = OrderCollection.findOne(orderId)

		var link = Configuration.site_address + '/order/' + orderId
		var subject = T("Link to your order").string
		var text = T("Thank you for placing an order at toitla.com")
			+ T("Your order has been sent to home chefs near you and soon someone will make a delicious offer") + '\n\n'
			+ T("When this happens we will send you an email.") + '\n\n'
			+ T("You will see the chefs' offers and can communicate them on your order page at: ") + link + '\n\n'
			+ '\n\n'
			+ T("With Kind Regards") + '\n\n'
			+ "toitla.com"
			
		Mailer.send(order.email, Configuration.email, subject, text)
	},
	//To: Client
	//When new offer received, existing changed or new chat message appears
	orderUpdated: function(orderId) {
		check(orderId, String)
		var order = OrderCollection.findOne(orderId)

		var link = Configuration.site_address + '/order/' + orderId
		var subject = T("You have a message from a chef!").string
		var text = T("You have a new message at toitla.com. To read it and to respond visit:") + '\n'
			+ link + '\n\n'
			+ T("If you need help, please call 58 49 43 40 or email us appi@toitla.com") + '\n'
			+ T("All feedback rocks are world!") + '\n'
			+ '\n\n'
			+ T("With Kind Regards") + '\n'
			+ T("toitla.com team ;)")
		Mailer.send(order.email, Configuration.email, subject, text)
	},
	/* Chef emails */
	//To: Chef
	//When a new order has been posted
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
		var createdAt = order.info.createdAt
		var deadline = order.info.date + " " + order.info.time
		// TODO replace localhost
		var link = Configuration.site_address + '/chef/' + chef._id

		var subject = T('Oven warm hands!').string
		var text = T("Warm up your oven and make flour up your hands!") + '\n'
			+ createdAt + " " + T("a new order was created:")+ '\n\n'
			+ desc + '\n\n'		
			+ T("You have time to cook until") + " " + deadline + '\n'
			+ T("Make an offer or specify the order:") + link + '\n'
			+ T("Using this link you can always see your offers.") + '\n'
			+ T("Please answer the client as soon as possible.") + '\n'
			+ T("If you need help, please call 58 49 43 40 or email us appi@toitla.com") + '\n'
			+ T("All feedback rocks are world!") + '\n'
			+ '\n\n'
			+ T("With Kind Regards") + '\n'
			+ T("toitla.com team ;)")

		Mailer.send(email, Configuration.email, subject, text)
	},
	//To: Chef
	//When client has confirmed chef's offer
	offerConfirmed: function(to, orderId) {
		var subject = T('One of your offers has been confirmed').string
		var text = T('YOU MUST COOK, NOW!')

		Mailer.send(to, '', subject, text)
	},
});