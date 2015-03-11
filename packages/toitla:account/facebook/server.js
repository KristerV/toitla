
ServiceConfiguration.configurations.remove({
	service: 'facebook'
})

Meteor.startup(function(){
	
	if (Global.isDev()) { // development key

		ServiceConfiguration.configurations.insert({
			service: 'facebook',
			appId: '1803235633235085',
			secret: '77550b19cf0b3bce933ab5e15aa2a196'
		})

	} else { // toitla.com key

		ServiceConfiguration.configurations.insert({
			service: 'facebook',
			appId: '1798689160356399',
			secret: '5a96e533aa1fa8767a876b677546adc9'
		})

	}
})