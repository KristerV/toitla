Template.chefView.helpers({
	orders: function() {
		var nowTimestamp = TimeSync.serverTime()
		var yesterdayTimestamp = moment(TimeSync.serverTime()).subtract(1, 'days').unix() * 1000

		var existsField = {}
		existsField['offers.$.'+Meteor.userId()] = {$exists: true}

		var offersMade = OfferCollection.find({'chefId' : Meteor.userId()}).fetch()

		var ordersWithMyOffers = []
		for (var i = 0; i < offersMade.length; i++) {
			ordersWithMyOffers.push(offersMade[i].orderId)
		};

		var notCancelledByThisChef = {}
		notCancelledByThisChef['cancelled_by_' + Meteor.userId()] = {$exists: false}

		var find = OrderCollection.find({
			$and: [
				notCancelledByThisChef,
				{
					$or: 
					[
						// orders with chef offers
						{
							$and: 
							[
								{_id: {$in: ordersWithMyOffers}},
								{'info.timestamp': {$gt: yesterdayTimestamp}}
							]
						},
						// orders without chef offers
						{
							$and : 
							[
								{_id: {$nin: ordersWithMyOffers}},
								{'info.timestamp': {$gt: nowTimestamp}},
								{offerWonBy: {$exists: false}},
							]
						}
					]
				}
			]
		},
		{sort: {'info.createdAt': -1}})
		return find
	},
})

Template.chefView.rendered = function() {
	if (Meteor.user() && (!Meteor.user().profile || !Meteor.user().profile.name))
		Global.setOverlay('chefProfile', {chefId: Meteor.userId()})
}