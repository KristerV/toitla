Template.chefView.helpers({
	orders: function() {
		return OrderCollection.find()
	},
})

