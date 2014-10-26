Mailer = {
	send: function (to, from, subject, text) {
		if (_.isUndefined(to) || _.isUndefined(subject) || _.isUndefined(text))
			return false

		var from = !_.isUndefined(from) ? from : Configuration.email
		check([to, from, subject, text], [String])

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
		if (!order) {
			console.log("No order provided: ", orderId)
			return
		}
		var email = order.info.email
		var link = Configuration.site_address + '/order/' + orderId
		var subject = T("Link to your order").string
		var text = T("Thank you for placing an order at toitla.com")
			+ T("Your order has been sent to home chefs near you and soon someone will make a delicious offer") + '\n\n'
			+ T("When this happens we will send you an email.") + '\n\n'
			+ T("You will see the chefs' offers and can communicate them on your order page at: ") + link + '\n\n'
			+ '\n\n'
			+ T("With Kind Regards") + '\n\n'
			+ T("toitla.com team ;)")
		Mailer.send(email, Configuration.email, subject, text)
	},
	//To: Client
	//When new offer received, existing changed or new chat message appears
	activityInOrder: function(orderId) {
		check(orderId, String)
		var order = OrderCollection.findOne(orderId)
		if (!order) {
			console.log("No order provided: ", orderId)
			return
		}
		var email = order.info.email
		var link = Configuration.site_address + '/order/' + orderId
		var subject = T("You have a message from a chef!").string
		var text = T("You have a new message at toitla.com. To read it and to respond visit:") + '\n'
			+ link + '\n\n'
			+ T("If you need help, please call 58 49 43 40 or email us appi@toitla.com") + '\n'
			+ T("All feedback rocks are world!") + '\n'
			+ '\n\n'
			+ T("With Kind Regards") + '\n'
			+ T("toitla.com team ;)")
		Mailer.send(email, Configuration.email, subject, text)
	},
	//To: Client
	//When new chat message appears
	chatActivity: function(offerId) {
		check(offerId, String)
		var offer = OfferCollection.findOne(offerId)
		if (!offer) {
			console.log("No offer provided: ", offerId)
			return
		}
		var order = OrderCollection.findOne(offer.orderId)
		Meteor.call('activityInOrder', order._id)
	},
	//To: Client
	//When offer has been confirmed
	offerConfirmationToClient: function(offerId) {
		check(offerId, String)
		var offer = OfferCollection.findOne(offerId)
		var order = OrderCollection.findOne(offer.orderId)
		var chef = Meteor.users.findOne(offer.chefId)
		if (!offer || !order || !chef) {
			console.log("No offer, order or chef provided: ", offer, order, chef)
			return
		}

		var link = Configuration.site_address + '/order/' + offer.orderId
		var email = order.info.email
		var offerDescription = offer.content
		var offerPrice = offer.price
		var chefNumber = chef.profile.telephone
		var address = chef.profile.street + " " + chef.profile.house + ", " + chef.profile.city
		var subject = T("It's a done deal!").string
		var text = T("We are glad you could make a deal with a chef.") + '\n'
			+ T("The confirmed offer is:") + '\n'
			+ offerDescription + '\n'	
			+ T("The confirmed price was") + " " + offerPrice +'\n'
			+ T("The chef has received your order and will start cooking.") + '\n'
			+ T("You can contact the chef with phone number") + " " + chefNumber + " "
			+ T("or chat with the chef at toitla.com homepage:") + " " + link + '\n'
			+ T("Now you need to arrange the delivery time with the chef.") + '\n'
			+ T("You need to pick up the order at the arrange time at the address") + " "	+ address +'\n'
			+ T("Make sure you have cash, because you need to pay to the chef on pick-up.") + '\n'
			+ T("In case you need to cancel the order, call the chef as soon as possible and let him know about it.") + '\n'
			+ '\n\n'
			+ T("With Kind Regards") + '\n\n'
			+ T("toitla.com team ;)")
			
		Mailer.send(email, Configuration.email, subject, text)

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
			+ T("Make an offer or specify the order:") + " " + link + '\n'
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
	offerConfirmationToChef: function(offerId) {
				check(offerId, String)
		var offer = OfferCollection.findOne(offerId)
		var order = OrderCollection.findOne(offer.orderId)
		var chef = Meteor.users.findOne(offer.chefId)
		if (!offer || !order || !chef) {
			console.log("No offer, order or chef provided: ", offer, order, chef)
			return
		}
		var link = Configuration.site_address + '/chef/' + chef._id
		var offerDescription = offer.content
		var offerPrice = offer.price
		var clientNumber = offer.clientTelephone
		var address = chef.profile.street + " " + chef.profile.house + ", " + chef.profile.city

		var subject = T("It's a done deal!").string
		var text = T("We are glad you could make a deal with the client.") + '\n'
			+ T("The confirmed offer is:") + '\n'
			+ offerDescription + '\n'	
			+ T("The confirmed price was") + " " + offerPrice +'\n'
			+ T("Now it's time to start cooking!") + '\n\n'
			+ T("You can contact the client with phone number") + " " + clientNumber + " "
			+ T("or chat at toitla.com homepage:") + " " + link + '\n'
			+ T("Now you need to arrange the delivery time.") + '\n'
			+ T("The client will pick up the order at the arrange time at your address") + " "	+ address +'\n'
			+ T("The client will pay in cash on pick-up.") + '\n'
			+ T("In case you need to cancel the order, call the client as soon as possible and let him know about it.") + '\n'
			+ '\n\n'
			+ T("With Kind Regards") + '\n\n'
			+ T("toitla.com team ;)")

		var email = chef.emails[0].address
		Mailer.send(email, Configuration.email, subject, text)
	},
	//To: Chef
	//When new chat activity under chef's active offer
	offerChatActivity: function(chefId, orderId) {
		check(orderId, String)
		check(chefId, String)
		var order = OrderCollection.findOne(orderId)
		var chef = Meteor.users.findOne(chefId)
		if (!order || !chef) {
			console.log("No order or chef provided: ", order, chef)
			return
		}
		var email = chef.emails[0].address
		var link = Configuration.site_address + '/chef/' + chef._id
		var subject = T("You have a message from a client").string
		var text = T("You have a new message at toitla.com. To read it and to respond visit:") + '\n'
			+ link + '\n\n'
			+ T("With Kind Regards") + '\n\n'
			+ T("toitla.com team ;)")
			
		Mailer.send(email, Configuration.email, subject, text)
	},
});