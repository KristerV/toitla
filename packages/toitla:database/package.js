Package.describe({
	name : 'toitla:database',
	summary : 'Methods for manipulating with Toitla\'s database',
	version : '1.0.0',
	git : ' /* Fill me in! */ '
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');
	api.export('Orders');
	api.export('Offers');
	api.addFiles(['offers.js', 'orders.js']);
	api.addFiles(['allow.js', 'publish.js'], 'server');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('toitla:database');
	api.addFiles('toitla:database-tests.js');
});
