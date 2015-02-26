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
	},
	addChatMessage: function(offer, message) {
		var id = offer._id
		if (!id) {
			console.log('offer not persisted')
			return
		}

		if (!offer.messages)
			OfferCollection.update(id, {$set: {messages: []}})

		OfferCollection.update(id, {$push: {messages: message}})

		if (Meteor.user()) {
			//Send notification to client
			Meteor.call('chatActivity', id)
		} else {
			//Send notification to chef
			Meteor.call('offerChatActivity', id)
		}
	}
}