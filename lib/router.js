Router.configure({
	layoutTemplate: 'layout',
	waitOn: function() {
		return [Meteor.subscribe('offer'), Meteor.subscribe('order')]
	}
});

// default route
// Router.route('/', function() {
// 		this.render('index');
// 	});

