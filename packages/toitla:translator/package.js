Package.describe({
	name: 'toitla:translator',
	summary: 'Keyword based translator with key:value logic',
	version: '1.0.0',
	git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');
	api.addFiles('toitla:translator.js', ['client', 'server']);
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('toitla:translator');
	api.addFiles('toitla:translator-tests.js');
});
