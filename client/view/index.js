
// All Sessions used
Session.setDefault('panel-left', null)
Session.setDefault('panel-center', null)
Session.setDefault('panel-right', null)
Session.setDefault('panel-right-post', null)
Session.setDefault('menubar-width', '10%')
Session.setDefault('upload-post-id', null)

// On boot
Meteor.startup(function(){
	if (document.URL.indexOf('www.toitla.com') > -1) {
		var newLink = document.URL.replace('www.toitla.com', 'toitla.com')
		window.location.replace(newLink)
	}
})