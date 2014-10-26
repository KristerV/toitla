Template.order.helpers({
	offerData: function(orderId) {
		if (Meteor.user()) {
			var offer = Offer.getChefOfferByOrderId(orderId)
			if (!offer) {
				return {editingOffer: true}
			}
			return offer
		} else {
			return this
		}
	},
	author: function() {

		if (this.author == 'client')
			return T("Me")

		var user = Meteor.users.findOne(this.author)
		if (!user)
			return false
		if (!user.profile || !user.profile.name) {
			return user.username
		}

		return user.profile.name
	},
	time: function() {
		return moment(this.timestamp).format('DD.MM.YYYY HH:mm');
	},
	authorData: function() {
		var chefId = this.chefId
		var chef = Meteor.users.findOne(chefId)
		if (!chef)
			return false
		return chef.profile
	},
	isClient: function() {
		return !Meteor.user()
	},
	offerIsWon: function() {
		if (Meteor.user() && this.offerWonBy == Meteor.userId())
			return true
		else if (Offer.getWinningOfferByOrderId(this.orderId))
			return true
	},
	userIsWinner: function() {
		if (Meteor.user()){ // User is chef
			var won
			if (this.price) // must be in "offer" context
				won = this.offerWonBy
			else { // must be in "order" context so "offerWonBy" is not directly available
				var offer = Offer.getChefOfferByOrderId(this._id)
				if (!offer) return false
				var won = offer.offerWonBy
			}
			return won == Meteor.userId()
		} else { // User is client
			return this.offerWonBy
		}
	},
	lostOffer: function() {
		var order = this
		if (!!Meteor.user()) { // Is chef
			var chefsOffer = Offer.getWinningOfferByOrderId(this._id)

			if (!chefsOffer)
				return false

			var won = chefsOffer.offerWonBy
			if (typeof won === "string" && won){
				return won != Meteor.userId()
			}
		}

	}
})

Template.order.events({
	'submit form[name="offer"]': function(e, tmpl) {
		e.preventDefault()
		var form = $(e.currentTarget)
		var values = Global.getFormValues(form)
		var orderId = form.parents('.order-block').data('order-id')
		var offer = Offer.getChefOfferByOrderId(orderId)

		if (offer) {
			values['editingOffer'] = false
			OfferCollection.update(offer._id, {$set: values})
		}
		else {
			values['chefId'] = Meteor.userId()
			values['orderId'] = orderId
			values['editingOffer'] = false
			OfferCollection.insert(values)
		}
		//Send notification to client
		Meteor.call('activityInOrder', orderId)
	},
	'submit form[name="chat"]': function(e, tmpl) {
		e.preventDefault()
		var form = $(e.currentTarget)
		var values = Global.getFormValues(form)
		form[0].reset()

		if (Meteor.user())
			values['author'] = Meteor.userId()
		else
			values['author'] = 'client'

		values['timestamp'] = TimeSync.serverTime()
		var id = form.data('offer-id')

		var offer = OfferCollection.findOne(id)
		if (!offer.messages)
			OfferCollection.update(id, {$set: {messages: []}})

		OfferCollection.update(id, {$push: {messages: values}})

		if (Meteor.user()) {
			//Send notification to client
			Meteor.call('chatActivity', id)
		} else {
			//Send notification to chef
			Meteor.call('offerChatActivity', id)
		}
	},
	'click a.cancel-offer': function(e, tmpl) {
		// FIXME: this is actually a huge problem:
		// When this view is used as a chef, this refers to an order,
		// When the same view is used as a client, this refers to an offer
		
		// maybe implement chef logic under a different view/link
		if (Meteor.user()) {
			// chef rejects the order
			var values = {}
			values['cancelled_by_' + Meteor.userId()] = true
			OrderCollection.update(this._id, {$set: values})
		}
		else {
			OfferCollection.update(this._id, {$set: {rejected: true}})		
		}
	},
	'click a.change-offer': function(e, tmpl) {
		OfferCollection.update(this._id, {$set: {editingOffer: true}})
	},
	'click a.confirm-offer': function(e, tmpl) {
		Global.setOverlay('confirmOffer', this)
	},
})