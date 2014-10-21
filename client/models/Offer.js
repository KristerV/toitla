Offer = {
	getChefOfferByOrderId: function(orderId) {
		return OfferCollection.findOne({chefId: Meteor.userId(), orderId: orderId})
	},
	getWinningOfferByOrderId: function(orderId) {
		return OfferCollection.findOne({offerWonBy: {$exists: true}, orderId: orderId})
	},
	getOrderOffersForClient: function(orderId) {
		return OfferCollection.find({
			$and : [
				{'orderId' : orderId},
				{'rejected' : {$exists : false}}
			]
		})
	}
}