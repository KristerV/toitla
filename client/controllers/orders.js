Template.orders.helpers({
	orders: function() {
		return OrderCollection.find()
	},
})

