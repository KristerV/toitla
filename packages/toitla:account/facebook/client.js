Meteor.startup(function(){
	Meteor.setTimeout(function(){
		var appId
		if (Configuration.development_server == 'localhost') { // local development key
			appId = '1803235633235085'
		} else if (Configuration.development_server == 'toitla.com:4000') { // toitla:4000 development key
			appId = '1803326889892626'
		} else { // toitla.com live key
			appId = '1798689160356399'
		}

		// Code given by facebook itself
		// https://developers.facebook.com/docs/javascript/quickstart/v2.2
		(function(d, s, id){
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		window.fbAsyncInit = function() {
			FB.init({
				appId: appId,
				status: true,
				xfbml: true,
				version: 'v2.1'
			})
		}
	}, 1000)
})