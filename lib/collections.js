Toitla4 = new Meteor.Collection('toitla4')

Meteor.startup(function(){
	if (Meteor.isServer) {
		Meteor.publish('toitla4', function() {
			return Toitla4.find()
		})
	}
	else if (Meteor.isClient) {
		Meteor.subscribe('toitla4')
	}
})