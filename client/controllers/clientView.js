Template.clientView.helpers({
	offersForClient: function() {
		var offers = Offer.getOrderOffersForClient(Session.get("orderId"))

		if (!offers)
			return false
		return offers
	}
})

Template.clientView.rendered = function() {
	var checkOrder = function() {
		var order = OrderCollection.findOne(Session.get("orderId"))
		if (order) {
			if (!order.email) {
				Global.setOverlay('orderEmail')
			}
		}
		else {
			Session.set("orderId", null)
		}
		// hack hack hack
		setTimeout(checkOrder, 1000)
	}

	Meteor.subscribe("order", checkOrder);
}