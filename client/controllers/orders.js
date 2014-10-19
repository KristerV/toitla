Template.orders.helpers({
	orders: function() {
		return OrderCollection.find()
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
	'submit form[name="chat"]': function(e, tmpl) {
		e.preventDefault()
		var form = $(e.currentTarget)
		var values = Global.getFormValues(form)
		values['author'] = Meteor.userId()
		values['timestamp'] = TimeSync.serverTime()
		OrderCollection.update(form.attr('id'), {$push: {messages: values}})
	}
})