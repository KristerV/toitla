Template.offer.helpers({
	author: function() {
		if ('client' == this.author)
			return T("Me")

		var user = Meteor.users.findOne(this.author)
		if (!user)
			return false
		if (!user.profile || !user.profile.name) {
			return user.username
		}

		return user.profile.name
	},
	time: function() {
		return moment(this.timestamp).format('DD.MM.YYYY HH:mm');
	},
	orderDateTime: function() {
		if (_.isUndefined(this.info))
			return false
		return moment(this.info.timestamp).format('D.M.YYYY HH:mm')
	},
	chefInfo : function() {
		var chef = Meteor.users.findOne(this.chefId)
		if (!chef) {
			return ''
		}

		var info = (chef.profile && chef.profile.name ? chef.profile.name : chef.username)
		if (chef.profile && chef.profile.street) {
			info += ', ' + chef.profile.street + ' ' + T('str')
		}
		if (chef.profile && chef.profile.city) {
			info += ', ' + chef.profile.city
		}
		return info		
	},
	chefProfile: function() {
		var chef = Meteor.users.findOne(this.chefId)
		if (!chef)
			return false
		return chef.profile
	},
	offerIsWon: function() {
		if (Offer.getWinningOfferByOrderId(this.orderId))
			return true
	},
	thisOfferIsWinner: function() {
		return this.offerWonBy
	},
	msg: function() {
		return Functions.formatText(this.msg)
	},
	content: function() {
		return Functions.formatText(this.content)
	}
})

Template.offer.events({
	'submit form[name="chat"]': function(e, tmpl) {
		e.preventDefault()
		var form = $(e.currentTarget)
		var values = Global.getFormValues(form)
		form[0].reset()
		values['author'] = 'client'

		values['timestamp'] = TimeSync.serverTime()

		var offer = OfferCollection.findOne(this._id)
		if (offer) {
			Offer.addChatMessage(offer, values)
		}
	},
	'click a.confirm-offer': function(e, tmpl) {
		Global.setOverlay('confirmOffer', this)
	},
	'click a.chef-info': function(e, tmpl) {
		Global.setOverlay('chefInfo', {chefId: this.chefId})
	}
})