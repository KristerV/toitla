Template.clientView.helpers({
	offers: function() {
		var offers = OfferCollection.find({orderId: Session.get("orderId")})
		if (!offers)
			return false
		return offers
	},
})