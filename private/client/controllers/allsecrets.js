Template.allsecrets.helpers({
	users: function() {
		return Meteor.users.find({}, {sort: {createdAt: -1}})
	},
	orders: function() {
		return OrderCollection.find({}, {sort: {'info.createdAt': -1}})
	},
	email: function() {
		return this.emails[0].address
	},
	createdAt: function() {
		return moment(this.createdAt).format('DD.MM.YYYY')
	},
	info: function() {
		var info = this.info
		info['creation'] = moment(info['createdAt']).format('DD.MM.YYYY')
		info['deadline'] = moment(info['timestamp']).format('DD.MM.YYYY HH:mm')

		var winningChef = Meteor.users.findOne(this['offerWonBy'])

		info['offerCount'] = OfferCollection.find({orderId: this._id}).fetch().length

		var winningOffer = OfferCollection.findOne({orderId: this._id, chefId: this['offerWonBy']})
		if (!_.isUndefined(winningOffer)) {
			info['price'] = winningOffer.price
			info['content'] = winningOffer.content
		}

		return info
	},
	winnerChefEmail: function() {
		var user = Meteor.users.findOne(this.offerWonBy)
		if (_.isUndefined(user))
			return false
		return user.username
	}
})