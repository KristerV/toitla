Template.orders.helpers({
	orders: function() {
		return OrderCollection.find()
	},
	itemExists: function() {
		var order = OrderCollection.findOne({'offers.chefId': Meteor.userId()})
		console.log(order)
		return order
	}
})

Template.orders.events({
	'submit form[name="offer"]': function(e, tmpl) {
		e.preventDefault()
		var form = $(e.currentTarget)
		var values = Global.getFormValues(form)
		var orderId = form.attr('id')

		// var order = OrderCollection.findOne({_id: orderId, 'offers.chefId': Meteor.userId()})
		OrderCollection.update(orderId, {$pull: {'offers.chefId': Meteor.userId()}})

		values['chefId'] = Meteor.userId()
		OrderCollection.update(orderId, {$push: {offer: values}})
	}
})