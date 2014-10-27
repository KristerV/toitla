Template.chefView.helpers({
	orders: function() {
		var nowDate = moment(TimeSync.serverTime()).format('DD.MM.YYYY')
		var yesterdayDate = moment(TimeSync.serverTime()).subtract(1, 'days').format('DD.MM.YYYY')
		var nowTime = moment(TimeSync.serverTime()).format('HH:MM')

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
								{'info.date': {$gt: yesterdayDate}}
							]
						},
						// orders without chef offers
						{
							$and : 
							[
								{_id: {$nin: ordersWithMyOffers}},
								{
									$or : 
									[
										{'info.date': {$gt: nowDate}},
										{
											$and: [
												{'info.date': nowDate}, 
											    {'info.time': {$gt: nowTime}}
											]
										},
									]
								},
								{offerWonBy: {$exists: false}}
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