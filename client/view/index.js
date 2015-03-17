
// All Sessions used
Session.setDefault('panel-left', null)
Session.setDefault('panel-center', null)
Session.setDefault('panel-right', null)
Session.setDefault('panel-right-post', null)
Session.setDefault('menubar-width', '10%')
Session.setDefault('upload-post-id', null)
Session.setDefault('panel-center-scroll', 0)

// On boot
Meteor.startup(function(){
	if (document.URL.indexOf('www.toitla.com') > -1) {
		var newLink = document.URL.replace('www.toitla.com', 'toitla.com')
		window.location.replace(newLink)
	}
})

// Window events
$(window)
	.scroll(function(){
		// Scroller.saveScroll()
	})
	.on("scrollstop", function() {
		// Scroller.doScroll()
	})
	.resize(function(){
		Scroller.findPanels()
		Client.getMenubarWidth()
	})
