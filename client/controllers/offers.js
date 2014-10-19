Template.clientView.helpers({
	offers: function() {
		var offers = OfferCollection.find({orderId: Session.get("orderId")})
		if (!offers)
			return false
		return offers
	},
	order: function() {
		var order = OrderCollection.findOne(Session.get("orderId"))
		if (_.isUndefined(order))
			return {}
		else
			return order
	}
})