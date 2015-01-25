Package.describe({
	name: 'toitla:mail',
	summary: ' /* Fill me in! */ ',
	version: '1.0.0',
	git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
	api.use('email');
	api.use('toitla:logging');
	api.versionsFrom('1.0');
	api.export('Tmail')
	api.addFiles('toitla:mail.js');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('toitla:mail');
	api.addFiles('toitla:mail-tests.js');
});
