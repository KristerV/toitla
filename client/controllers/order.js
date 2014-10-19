Template.order.helpers({
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
	author: function() {
		var user = Meteor.users.findOne(this.author)
		if (_.isUndefined(user) || _.isUndefined(user.profile))
			return this.username
		return user.profile.name
	},
	time: function() {
		return moment(this.timestamp)
	}
})