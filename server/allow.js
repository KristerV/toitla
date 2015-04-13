Toitla4.allow({
	insert: function(userId, doc) {
		return true
	}
})

Meteor.startup(function(){
	Meteor.publish('toitla4')
})