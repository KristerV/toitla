Template.orders.helpers({
	orders: function() {
		return OrderCollection.find()
	},
	offerContent: function() {
		var order = OrderCollection.findOne({_id: this._id, 'offers.chefId': Meteor.userId()})
		if (_.isUndefined(order) || _.isUndefined(order.offers)) {
			return false
		}

		for (var i = 0; i < order.offers.length; i++) {
			if (order.offers[i].chefId == Meteor.userId()) {
				return order.offers[i].content
			}
		}

	},
	offerPrice: function() {
		var order = OrderCollection.findOne({_id: this._id, 'offers.chefId': Meteor.userId()})
		if (_.isUndefined(order) || _.isUndefined(order.offers))
			return false

		for (var i = 0; i < order.offers.length; i++) {
			if (order.offers[i].chefId == Meteor.userId()) {
				return order.offers[i].price
			}
		}
	},
})

Template.orders.events({
	'submit form[name="offer"]': function(e, tmpl) {
		e.preventDefault()
		var form = $(e.currentTarget)
		var values = Global.getFormValues(form)
		var orderId = form.attr('id')

		var item = {}
		item['offers'] = {chefId: Meteor.userId()}
		OrderCollection.update(orderId, {$pull: item})

		values['chefId'] = Meteor.userId()
		OrderCollection.update(orderId, {$push: {offers: values}})
	}
})