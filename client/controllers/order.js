Template.order.helpers({
	offerContent: function() {
		var order = OrderCollection.findOne({_id: this._id})
		if (_.isUndefined(order) || _.isUndefined(order.offers)) {
			return false
		}

		// Is chef or normal user?
		if (Meteor.user()) {
			if (_.isUndefined(order.offers[Meteor.userId()]))
				return false
			return order.offers[Meteor.userId()].content
		} else {
			console.log(this)
			// var chefId = .parents('.order-block').attr('id')
			// return order.offers[Meteor.userId()].content
		}

	},
	offerPrice: function() {
		var order = OrderCollection.findOne({_id: this._id})
		if (_.isUndefined(order) || _.isUndefined(order.offers))
			return false

		// Is chef or normal user?
		if (Meteor.user()) {
			if (_.isUndefined(order.offers[Meteor.userId()]))
				return false
			return order.offers[Meteor.userId()].price
		} else {
		}
	},
	messages: function(){
		var id

		if (Meteor.user())
			id = this._id
		else
			id = Session.get('orderId')

		var order = OrderCollection.findOne(id)
		if (_.isUndefined(order) || _.isUndefined(order.messages))
			return false

		return order.messages
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
		var orderId = form.parents('.order-block').attr('id')

		var data = {}
		data['offers.'+Meteor.userId()] = values

		OrderCollection.update(orderId, {$set: data})
	},
	'submit form[name="chat"]': function(e, tmpl) {
		e.preventDefault()
		var form = $(e.currentTarget)
		var values = Global.getFormValues(form)

		if (Meteor.user())
			values['author'] = Meteor.userId()
		else
			values['author'] = 'client'

		values['timestamp'] = TimeSync.serverTime()
		var id = Session.get('orderId') ? Session.get('orderId') : form.parents('.order-block').attr('id')
		OrderCollection.update(id, {$push: {messages: values}})
	}
})