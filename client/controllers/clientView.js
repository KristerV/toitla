Template.clientView.helpers({
	offersForClient: function() {
		var offers = Offer.getOrderOffersForClient(Session.get("orderId"), {sort: {createdAt: 1}})

		if (!offers)
			return false
		return offers
	},
	getOrder: function() {
		var order = OrderCollection.findOne(Session.get("orderId"))

		if (_.isUndefined(order))
			return {}
		else
			return order
	},
	orderData: function() {
		var order = OrderCollection.findOne(Session.get("orderId"))
		if (_.isUndefined(order))
			return {}
		else
			return order
	}
})

Template.clientView.rendered = function() {
	Global.setOverlay('clientInstructionsOverlay')
}