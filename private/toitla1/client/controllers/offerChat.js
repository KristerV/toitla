Template.offerChat.helpers({
	chefName: function() {
		var offerId = Session.get('chatActive')
		var offer = OfferCollection.findOne(offerId)
		if (!offer)
			return false
		var chef = Meteor.users.findOne(offer.chefId)
		if (!chef)
			return false
		return chef.profile.name
	},
	messages: function() {
		var offerId = Session.get('chatActive')
		var offer = OfferCollection.findOne(offerId)
		if (!offer)
			return false

		return offer.messages
	}
})