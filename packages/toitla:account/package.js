Package.describe({
	name: 'toitla:account',
	summary: ' /* Fill me in! */ ',
	version: '1.0.0',
	git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
	api.use('ian:accounts-ui-bootstrap-3');
	api.use('accounts-password');
	api.versionsFrom('1.0');
	api.addFiles('toitla:account.js');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('toitla:account');
	api.addFiles('toitla:account-tests.js');
});
