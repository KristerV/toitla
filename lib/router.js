Router.configure({
	layoutTemplate: 'layout',
	waitOn: function() {
		return [Meteor.subscribe('offer'), Meteor.subscribe('order')]
	}
})