Template.chefView.helpers({
	orders: function() {
		var now = moment(TimeSync.serverTime()).subtract(1, 'days').format('DD.MM.YYYY')
		return OrderCollection.find({'info.date': {$gt: now}})
	},
})

Template.chefView.rendered = function() {
	if (Meteor.user() && (!Meteor.user().profile || !Meteor.user().profile.name))
		Global.setOverlay('chefProfile', {chefId: Meteor.userId()})
}