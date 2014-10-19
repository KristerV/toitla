Template.orders.helpers({
	orders: function() {
		return OrderCollection.find()
	},
	offerContent: function() {
		var order = OrderCollection.findOne({_id: this._id})
		if (_.isUndefined(order) || _.isUndefined(order.offers)) {
			return false
		}

		return order.offers[Meteor.userId()].content
	},
	offerPrice: function() {
		var order = OrderCollection.findOne({_id: this._id})
		if (_.isUndefined(order) || _.isUndefined(order.offers))
			return false

		return order.offers[Meteor.userId()].price
	},
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
})