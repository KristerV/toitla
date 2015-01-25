Package.describe({
	name : 'toitla:database',
	summary : 'Methods for manipulating with Toitla\'s database',
	version : '1.0.0',
	git : ' /* Fill me in! */ '
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');
	api.addFiles(['offers/offers-api.js', 'orders/orders-api.js']);	
	api.addFiles(['offers/offers.js', 'orders/orders.js'], 'server');
	api.addFiles('log/log-api.js', ['client','server']);
	api.addFiles('log/log.js', 'server');
	api.addFiles(['allow.js', 'publish.js'], 'server');
	
	api.export('Orders');
	api.export('Offers');
	api.export('Log');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('toitla:database');
	api.addFiles('toitla:database-tests.js');
});
