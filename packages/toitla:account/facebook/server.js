
ServiceConfiguration.configurations.remove({
	service: 'facebook'
})

Meteor.startup(function(){
	
	if (Configuration.development_server == 'localhost') { // local development key

		console.log("Configure facebook option 1")
		ServiceConfiguration.configurations.insert({
			service: 'facebook',
			appId: '1803235633235085',
			secret: '77550b19cf0b3bce933ab5e15aa2a196'
		})

	} else if (Configuration.development_server == 'toitla.com:4000') { // toitla:4000 development key

		console.log("Configure facebook option 2")
		ServiceConfiguration.configurations.insert({
			service: 'facebook',
			appId: '1803326889892626',
			secret: '69a3f5c317744edd785cf94e6dfd0328'
		})

	} else { // toitla.com live key

		console.log("Configure facebook option 3")
		ServiceConfiguration.configurations.insert({
			service: 'facebook',
			appId: '1798689160356399',
			secret: '5a96e533aa1fa8767a876b677546adc9'
		})

	}
})