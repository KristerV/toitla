Package.describe({
	name: 'toitla:translator',
	summary: ' /* Fill me in! */ ',
	version: '1.0.0',
	git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
	//api.use('nemo64:translator'); // does not work with meteor .9+
	api.versionsFrom('1.0');
	api.addFiles('toitla:translator.js');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('toitla:translator');
	api.addFiles('toitla:translator-tests.js');
});
