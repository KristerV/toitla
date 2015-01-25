Package.describe({
	name: 'toitla:map',
	summary: 'Map functions and components for Toitla',
	version: '1.0.0',
	git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');
	api.use('toitla:database');
	api.imply('dburles:google-maps');
	
	//api.addFiles('gmap.js', 'client');
	
	api.addFiles('map-api.js');
	api.addFiles('map.js', 'server');
	
	api.export('Map');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('toitla:map');
	api.addFiles('toitla:map-tests.js');
});
