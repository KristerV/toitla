Package.describe({
	name: 'toitla:map',
	summary: ' /* Fill me in! */ ',
	version: '1.0.0',
	git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
	api.imply('servicelocale:googlemaps-api');
	api.versionsFrom('1.0');
	api.addFiles('toitla:map.js');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('toitla:map');
	api.addFiles('toitla:map-tests.js');
});
