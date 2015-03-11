Package.describe({
	name: 'toitla:account',
	summary: ' /* Fill me in! */ ',
	version: '1.0.0',
	git: ' /* Fill me in! */ '
})

Package.onUse(function(api) {
	api.versionsFrom('1.0')
	api.use(['accounts-password','accounts-facebook', 'toitla:global'])
	api.use(['mquandalle:jade', 'less', 'templating'], 'client')
	api.use(['service-configuration'], 'server')
	api.addFiles('user.js')
	api.addFiles('server.js', 'server')
	api.addFiles('publish.js', 'server')
	api.addFiles('subscribe.js', 'client')
	api.addFiles('facebook/loginFacebook.jade', 'client')
	api.addFiles('facebook/loginFacebook.less', 'client')
	api.addFiles('facebook/loginFacebook.js', 'client')
	api.addFiles('facebook/server.js', 'server')
	api.export('User')
})

Package.onTest(function(api) {
	api.use('tinytest')
	api.use('toitla:account')
	api.addFiles('toitla:account-tests.js')
})
