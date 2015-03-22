Package.describe({
	name: 'toitla:map',
	summary: 'Map functions and components for Toitla',
	version: '1.0.0',
	git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');
	api.use(['mquandalle:jade', 'less', 'templating'], 'client')
	api.use('dburles:google-maps');	
	api.addFiles(['view/map.jade', 'view/map.less', 'view/map.js'], 'client');
	
	api.addFiles('map-api.js');
	api.addFiles('MapCalculations.js', 'server');
	
	api.export('Map');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('toitla:map');
	api.addFiles('toitla:map-tests.js');
});
