Template.index.helpers({
	order : function() {
		var order = Session.get('order');
		if (!order)
			return {};
		return order;
	}
});

Template.index.events({
	'submit form' : function(e, template) {
		e.preventDefault();
		var order = ClientHelper.getFormValues(e.target);
		Orders.add(order, function(err, orderId) {
			if (err) {
				throw new Meteor.Error('order-add-fail', 'Error adding order', err);
			}
			else {
				Session.set('order', order);
				Router.go('confirmOrder', {_id:orderId});
			}
		});
	}
});

Template.index.rendered = function() {
	document.title = T('site_title');
	$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">');

	if ('undefined' == typeof Configuration) {
		alert('Hey, Krister! \n\n Yes you!\nPlease provide a /lib/configuration.js \n(there is an example file also).');
	}
	
	Meteor.setTimeout(function(){
		if (Session.get('showLogin')) {
			if (Meteor.user()) {
				Session.set('showLogin', null);
			}
			else {
				Global.setOverlay('loginForm');
			}
		}
	}, 500);
};
 