Router.configure({
	layoutTemplate: 'layout'
});

// default route
Router.route('/', function() {
	this.render('index');
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