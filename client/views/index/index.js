/*
Template.index.helpers({

})

Template.index.rendered = function() {
	//document.title = T('Homecooks')
	$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1">')

	if ('undefined' == typeof Configuration) {
		alert('Hey, developer! \n\n Yes you!\nPlease provide a /lib/configuration.js \n(there is an example also).')
	}

	
	Meteor.setTimeout(function(){
		if (Session.get('showLogin')) {
			if (Meteor.user()) {
				Session.set('showLogin', null)
			}
			else {
				Global.setOverlay('loginForm')
			}
		}
	}, 500)
}
 */