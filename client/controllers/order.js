Template.order.helpers({
	offerData: function(orderId) {
		return OfferCollection.findOne({chefId: Meteor.userId(), orderId: orderId})
	},
	author: function() {
		if (this.author == 'client')
			return T("Me")
		var user = Meteor.users.findOne(this.author)
		if (_.isUndefined(user) || _.isUndefined(user.profile))
			return this.username

		return user.profile.name
	},
	time: function() {
		return moment(this.timestamp).format('DD.MM.YYYY HH:mm');
	},
	userIsChef: function() {
		return Meteor.user()
	}
})

Template.order.events({
	'submit form[name="offer"]': function(e, tmpl) {
		e.preventDefault()
		var form = $(e.currentTarget)
		var values = Global.getFormValues(form)
		var orderId = form.parents('.order-block').data('order-id')
		var offer = OfferCollection.findOne({chefId: Meteor.userId(), orderId: orderId})

		if (offer) {
			console.log(" here 1")
			OfferCollection.update(offer._id, {$set: values})
		}
		else {
			console.log(" here 2")
			values['chefId'] = Meteor.userId()
			values['orderId'] = orderId
			OfferCollection.insert(values)
		}

		console.log(OfferCollection.findOne({chefId: Meteor.userId(), orderId: orderId}))
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
	}
})