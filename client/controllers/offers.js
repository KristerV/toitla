Template.offers.helpers({
	offers: function() {
		var order = OrderCollection.findOne(Session.get("orderId"))
		if (!order)
			return false
		var offers = []
		_.each(order.offers, function(obj, chefId){
			obj['chefId'] = chefId
			offers.push(obj)
		})
		return offers
	}
})