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
	api.imply('toitla:global');
	api.imply('toitla:locale');
	api.imply('toitla:mail');
	// api.imply('toitla:map');
	api.imply('toitla:scroller');
	api.imply('toitla:panel');
	api.imply('toitla:posts');
	// api.imply('toitla:images');
	api.imply('toitla:account');
	api.use('spacebars');
	api.versionsFrom('1.0');
	api.addFiles('toitla:common.js');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('toitla:common');
	api.addFiles('toitla:common-tests.js');
});

