Router.configure({
	layoutTemplate: 'layout',
	waitOn: function() {
		return [Meteor.subscribe('offer'), Meteor.subscribe('order')];
	}
});

// default route
Router.route('/', function() {
	this.render('index');
}, {
	name: 'index'
});
Router.route('/order/:_id/unconfirmed', function() {
	var id = this.params._id;
	Session.set('orderId', id);
	this.render('confirmOrder');
}, {
	name: 'confirmOrder'
});

Router.route('/order/:_id', function() {	
	this.render('client', function () {
		var order = Orders.findOne(this.params._id);
		console.log('hi!');
		if (!order.confirmed) {
			console.log('Here i am');
			Router.go('confirmOrder', {_id: this.params._id});
		}
	});

}, {
	name: 'client'
});

/* Old logics:

	layout: function() {
		var template
		var orderId = Session.get('orderId')
		if (!!Meteor.user()) { // User is chef
			template = 'chefView'
		}
		else if (!!Session.get('view')) {
			template = Session.get('view')
		}
		else if (!!orderId) { // There is an order hash
			template = 'clientView'
		}
		else { // Anonymous new user
			template = 'createOrder'
		}

		return Template[template]
	}

*/