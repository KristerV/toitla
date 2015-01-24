Package.describe({
	name: 'toitla:locale',
	summary: ' /* Fill me in! */ ',
	version: '1.0.0',
	git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
	api.imply('toitla:date');
  	api.imply('toitla:translator');
	api.versionsFrom('1.0');
	api.addFiles('toitla:locale.js');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('toitla:locale');
	api.addFiles('toitla:locale-tests.js');
});
