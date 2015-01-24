Package.describe({
	name: 'toitla:common',
	summary: 'Common tools for all toitla functionality',
	version: '1.0.0',
	git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
	api.imply('mquandalle:jade');
	api.imply('less');
	api.imply('toitla:logging');
	api.imply('toitla:locale');
	api.imply('toitla:mail');
	api.imply('toitla:map');
	api.imply('toitla:database');
	api.use('spacebars');
	api.versionsFrom('1.0');
	api.addFiles('toitla:common.js');
	api.export('Common', ['client', 'server']);
	api.export('ClientHelper', 'client');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('toitla:common');
	api.addFiles('toitla:common-tests.js');
});

