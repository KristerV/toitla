Session.setDefault('locale', 'et')

Meteor.startup(function() {
	GoogleMaps.load({
		key : 'AIzaSyBTF7DCswQz8sZn8WvDnPmFVwz7rjFeQQk'
	});
});