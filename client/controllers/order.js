Template.order.helpers({
	offerData: function(orderId) {
		if (Meteor.user()) {
			var offer = OfferCollection.findOne({chefId: Meteor.userId(), orderId: orderId})
			if (!offer)
				return {editingOffer: true}
			return offer
		} else {
			return this
		}
	},
	author: function() {

		if (this.author == 'client')
			return T("Me")

		var user = Meteor.users.findOne(this.author)
		if (!user || !user.profile || !user.prfile.name) {
			return user.username
		}

		return user.profile.name
	},
	time: function() {
		return moment(this.timestamp).format('DD.MM.YYYY HH:mm');
	},
})

Template.order.events({
	'submit form[name="offer"]': function(e, tmpl) {
		e.preventDefault()
		var form = $(e.currentTarget)
		var values = Global.getFormValues(form)
		var orderId = form.parents('.order-block').data('order-id')
		var offer = OfferCollection.findOne({chefId: Meteor.userId(), orderId: orderId})

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
	},
	'click a.change-offer': function(e, tmpl) {
		OfferCollection.update(this._id, {$set: {editingOffer: true}})
	}
})