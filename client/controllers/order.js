Template.order.helpers({
	chefHasNotMadeOffer: function() {
		var offer = Offer.getChefOfferByOrderId(this._id)
		if (offer && !offer.editingOffer)
			return false
		return true
	},
	offerData: function() {
		var offer = Offer.getChefOfferByOrderId(this._id)
		if (!offer) {
			return {editingOffer: true}
		}
		return offer
	},
	author: function() {
		if ('client' == this.author)
			return T("Client")
		else
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
	orderDateTime: function() {
		if (_.isUndefined(this.info))
			return false
		return moment(this.info.timestamp).format('D.M.YYYY HH:mm')
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
	thisOfferIsWinner: function() {
		return this.offerWonBy
	},
	userIsWinner: function() {
		var won
		var offer = Offer.getChefOfferByOrderId(this._id)
		if (!offer) return false
		
		return offer.offerWonBy == Meteor.userId()
	},
	lostOffer: function() {
		var chefsOffer = Offer.getWinningOfferByOrderId(this._id)

		if (!chefsOffer)
			return false

		var won = chefsOffer.offerWonBy
		if (typeof won === "string" && won){
			return won != Meteor.userId()
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
			values['createdAt'] = TimeSync.serverTime()
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

		values['author'] = Meteor.userId()		
		values['timestamp'] = TimeSync.serverTime()
		var id = form.data('offer-id')

		var offer = OfferCollection.findOne(id)
		if (!offer) {
			// create new offer to add chat
			offer = {}
			offer['chefId'] = Meteor.userId()
			offer['orderId'] = form.parents('.order-block').data('order-id')
			offer['editingOffer'] = true
			OfferCollection.insert(offer, function(err, offerId){
				if (err) {
					console.log(err)
				}
				var offer = OfferCollection.findOne(offerId)
			    Offer.addChatMessage(offer, values)
			})
		}
		else {
			Offer.addChatMessage(offer, values)
		}
	},
	'click a.hide-order': function(e, tmpl) {
		// chef cancels the order
		$(e.target).parents('.order-block').slideUp(function() {
			
			var offer = Offer.getChefOfferByOrderId(this._id)
			if (offer) {
				// TODO: if offer is made, maybe we should notify the client here
				OfferCollection.remove(offer._id);
			}
			var values = {}
			values['cancelled_by_' + Meteor.userId()] = true
			OrderCollection.update(this._id, {$set: values})
			
		}.bind(this))
	},
	'click a.change-offer': function(e, tmpl) {
		OfferCollection.update(this._id, {$set: {editingOffer: true}})
	}
})