Template.offers.helpers({
	offers: function() {
		var offer = OfferCollection.findOne({orderId: Session.get("orderId")})
		console.log(offer)
		if (!offer)
			return false
		return offer
	}
})