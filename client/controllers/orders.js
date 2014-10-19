Template.orders.helpers({
	orders: function() {
		return OrderCollection.find()
	},
	offerContent: function() {
		var order = OrderCollection.findOne({_id: this._id})
		if (_.isUndefined(order) || _.isUndefined(order.offers) || _.isUndefined(order.offers.content)) {
			return false
		}

		return order.offers[Meteor.userId()].content
	},
	offerPrice: function() {
		var order = OrderCollection.findOne({_id: this._id})
		if (_.isUndefined(order) || _.isUndefined(order.offers) || _.isUndefined(order.offers.price))
			return false

		return order.offers[Meteor.userId()].price
	},
	messages: function(){
		var order = OrderCollection.findOne({_id: this._id})
		if (_.isUndefined(order) || _.isUndefined(order.messages))
			return false
		return order.messages
	},
	time: function() {
		return moment(this.timestamp)
	}
})

Template.orders.events({
	'submit form[name="offer"]': function(e, tmpl) {
		e.preventDefault()
		var form = $(e.currentTarget)
		var values = Global.getFormValues(form)
		var orderId = form.attr('id')

		var data = {offers: {}}
		data.offers[Meteor.userId()] = values

		OrderCollection.update(orderId, {$set: data})
		console.log(OrderCollection.findOne(orderId))
	},
	'submit form[name="chat"]': function(e, tmpl) {
		e.preventDefault()
		var form = $(e.currentTarget)
		var values = Global.getFormValues(form)
		values['author'] = Meteor.userId()
		values['timestamp'] = TimeSync.serverTime()
		OrderCollection.update(form.attr('id'), {$push: {messages: values}})
	}
})